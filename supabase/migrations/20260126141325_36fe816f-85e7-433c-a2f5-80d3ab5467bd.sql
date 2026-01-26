-- =============================================
-- FIX 1: Admin Role Infrastructure
-- =============================================

-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for proper role management
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Users can view their own roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- =============================================
-- FIX 2: Contact Submissions Admin Access
-- =============================================

-- Drop the restrictive no-select policy
DROP POLICY IF EXISTS "contact_no_select" ON public.contact_submissions;

-- Create policy allowing only admins to read contact submissions
CREATE POLICY "Admins can view contact submissions"
  ON public.contact_submissions FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- FIX 3: Protect Order Financial Fields
-- =============================================

-- Create trigger function to prevent financial field modifications
CREATE OR REPLACE FUNCTION public.prevent_financial_field_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Prevent modification of financial fields
  IF NEW.total != OLD.total THEN
    RAISE EXCEPTION 'Cannot modify order total';
  END IF;
  
  IF NEW.subtotal != OLD.subtotal THEN
    RAISE EXCEPTION 'Cannot modify order subtotal';
  END IF;
  
  IF NEW.tax != OLD.tax THEN
    RAISE EXCEPTION 'Cannot modify order tax';
  END IF;
  
  IF NEW.shipping_cost != OLD.shipping_cost THEN
    RAISE EXCEPTION 'Cannot modify order shipping cost';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger on orders table
CREATE TRIGGER prevent_order_financial_changes
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_financial_field_changes();
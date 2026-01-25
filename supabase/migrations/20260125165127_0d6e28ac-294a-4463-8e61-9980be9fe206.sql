-- =====================================================
-- FIX 1: Create authoritative products table for server-side price validation
-- =====================================================

CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL CHECK (price >= 0),
  category TEXT NOT NULL,
  image_url TEXT,
  datasheet_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Products are publicly readable (catalog)
CREATE POLICY "Products are publicly readable"
ON public.products
FOR SELECT
USING (is_active = true);

-- Only service role can modify products (no client-side modifications)
-- No INSERT/UPDATE/DELETE policies for authenticated users

-- Add trigger for updated_at
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- FIX 2: Create price validation function for order_items
-- =====================================================

CREATE OR REPLACE FUNCTION public.validate_order_item_price()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  actual_price NUMERIC;
BEGIN
  -- Look up the authoritative price from products table
  SELECT price INTO actual_price
  FROM public.products
  WHERE id = NEW.product_id AND is_active = true;
  
  -- If product not found, reject the insert
  IF actual_price IS NULL THEN
    RAISE EXCEPTION 'Product not found or inactive: %', NEW.product_id;
  END IF;
  
  -- Override the client-provided price with server-side authoritative price
  NEW.unit_price := actual_price;
  NEW.total_price := actual_price * NEW.quantity;
  
  RETURN NEW;
END;
$$;

-- Apply validation trigger BEFORE INSERT on order_items
CREATE TRIGGER validate_order_item_price_trigger
BEFORE INSERT ON public.order_items
FOR EACH ROW
EXECUTE FUNCTION public.validate_order_item_price();

-- =====================================================
-- FIX 3: Seed products table with existing product data
-- =====================================================

INSERT INTO public.products (id, name, description, price, category, image_url, datasheet_url) VALUES
('sierra-f1-mini', 'Sierra F1 Mini', 'Compact flight controller with advanced stabilization', 24999, 'Flight Controllers', '/products/sierra-f1-mini.jpg', '/datasheets/Sierra-F1-Mini_V2.pdf'),
('sierra-f1', 'Sierra F1', 'Professional-grade flight controller for commercial drones', 44999, 'Flight Controllers', '/products/sierra-f1.jpg', NULL),
('truenav-pro', 'TrueNav Pro', 'High-precision GPS module with RTK support', 34999, 'Navigation', '/products/truenav-pro.jpg', '/datasheets/Sierra_TrueNav.pdf'),
('truenav-mini', 'TrueNav Mini', 'Compact GPS module for lightweight applications', 19999, 'Navigation', '/products/truenav-mini.jpg', '/datasheets/Sierra_TrueNav.pdf'),
('truenavic', 'TrueNavIC Pro', 'Integrated navigation computer with INS', 89999, 'Navigation', '/products/truenavic.jpg', '/datasheets/Sierra_TrueNavIC-Pro.pdf'),
('micronav-fpv', 'MicroNav FPV', 'Ultra-lightweight GPS for FPV racing drones', 14999, 'Navigation', '/products/micronav-fpv.jpg', '/datasheets/Sierra-MicroNav-FPV.pdf'),
('precisionpoint-pro', 'PrecisionPoint Pro', 'RTK base station for centimeter-level accuracy', 149999, 'RTK Systems', '/products/precisionpoint-pro.jpg', '/datasheets/Sierra_PrecisionPoint_series.pdf'),
('precisionpoint-se', 'PrecisionPoint SE', 'Standard edition RTK receiver', 79999, 'RTK Systems', '/products/precisionpoint-se.jpg', '/datasheets/Sierra_PrecisionPoint_series.pdf'),
('precisionpoint-base', 'PrecisionPoint Base', 'Ground-based RTK reference station', 199999, 'RTK Systems', '/products/precisionpoint-base.jpg', '/datasheets/Sierra_RTK_PPK.pdf'),
('truepilot', 'TruePilot', 'Autonomous flight computer with AI capabilities', 124999, 'Autopilot', '/products/truepilot.jpg', '/datasheets/Sierra-TruePilot.pdf'),
('truespeed-v2', 'TrueSpeed V2', 'High-accuracy airspeed sensor', 12999, 'Sensors', '/products/truespeed-v2.jpg', NULL),
('truenorth-truespeed', 'TrueNorth + TrueSpeed', 'Combined magnetometer and airspeed bundle', 18999, 'Sensors', '/products/truenorth-truespeed.jpg', NULL),
('smart-bms', 'Smart BMS', 'Intelligent battery management system', 29999, 'Power Systems', '/products/smart-bms.jpg', NULL),
('pulse-esc', 'Pulse ESC', 'High-performance electronic speed controller', 8999, 'Power Systems', '/products/pulse-esc.jpg', NULL),
('navicore', 'Sierra NaviCore', 'Enterprise navigation development platform', 0, 'Development Kits', '/products/navicore.jpg', NULL);

-- =====================================================
-- FIX 4: Strengthen contact_submissions security
-- Drop and recreate policies to ensure no permissive policies exist
-- =====================================================

-- First drop existing policies
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
DROP POLICY IF EXISTS "Deny public read access to contact submissions" ON public.contact_submissions;

-- Recreate as RESTRICTIVE policies (already were, but being explicit)
CREATE POLICY "contact_insert_only"
ON public.contact_submissions
AS RESTRICTIVE
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Explicit deny for all other operations
CREATE POLICY "contact_no_select"
ON public.contact_submissions
AS RESTRICTIVE
FOR SELECT
TO anon, authenticated
USING (false);

CREATE POLICY "contact_no_update"
ON public.contact_submissions
AS RESTRICTIVE
FOR UPDATE
TO anon, authenticated
USING (false);

CREATE POLICY "contact_no_delete"
ON public.contact_submissions
AS RESTRICTIVE
FOR DELETE
TO anon, authenticated
USING (false);
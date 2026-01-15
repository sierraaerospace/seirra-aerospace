-- Add UPDATE policy for orders - allows users to update their own pending/confirmed orders
CREATE POLICY "Users can update their own pending or confirmed orders"
ON public.orders
FOR UPDATE
USING (auth.uid() = user_id AND status IN ('pending', 'confirmed'))
WITH CHECK (auth.uid() = user_id AND status IN ('pending', 'confirmed', 'cancelled'));

-- Add DELETE policy for orders - allows users to cancel only pending orders
CREATE POLICY "Users can cancel their own pending orders"
ON public.orders
FOR DELETE
USING (auth.uid() = user_id AND status = 'pending');
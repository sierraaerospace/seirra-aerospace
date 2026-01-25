-- Add UPDATE policy for order_items (only for pending orders)
CREATE POLICY "Users can update order items for their pending orders" 
ON public.order_items 
FOR UPDATE 
USING (EXISTS ( 
  SELECT 1 FROM orders 
  WHERE orders.id = order_items.order_id 
  AND orders.user_id = auth.uid() 
  AND orders.status = 'pending'::order_status
))
WITH CHECK (EXISTS ( 
  SELECT 1 FROM orders 
  WHERE orders.id = order_items.order_id 
  AND orders.user_id = auth.uid() 
  AND orders.status = 'pending'::order_status
));

-- Add DELETE policy for order_items (only for pending orders)
CREATE POLICY "Users can delete order items for their pending orders" 
ON public.order_items 
FOR DELETE 
USING (EXISTS ( 
  SELECT 1 FROM orders 
  WHERE orders.id = order_items.order_id 
  AND orders.user_id = auth.uid() 
  AND orders.status = 'pending'::order_status
));
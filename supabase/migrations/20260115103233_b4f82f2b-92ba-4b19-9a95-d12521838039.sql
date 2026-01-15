-- Add CHECK constraints for positive amounts on orders table
ALTER TABLE public.orders
ADD CONSTRAINT orders_positive_amounts CHECK (
  subtotal >= 0 AND
  shipping_cost >= 0 AND
  tax >= 0 AND
  total >= 0
);

-- Add CHECK constraints for positive amounts on order_items table
ALTER TABLE public.order_items
ADD CONSTRAINT order_items_positive_amounts CHECK (
  quantity > 0 AND
  unit_price >= 0 AND
  total_price >= 0
);

-- Create validation function for order totals
CREATE OR REPLACE FUNCTION public.validate_order_total()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.total != (NEW.subtotal + NEW.shipping_cost + NEW.tax) THEN
    RAISE EXCEPTION 'Order total does not match sum of components';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for order total validation
CREATE TRIGGER validate_order_total_trigger
BEFORE INSERT OR UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.validate_order_total();

-- Create validation function for order item totals
CREATE OR REPLACE FUNCTION public.validate_order_item_total()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.total_price != (NEW.unit_price * NEW.quantity) THEN
    RAISE EXCEPTION 'Order item total does not match unit price * quantity';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for order item total validation
CREATE TRIGGER validate_order_item_total_trigger
BEFORE INSERT OR UPDATE ON public.order_items
FOR EACH ROW
EXECUTE FUNCTION public.validate_order_item_total();
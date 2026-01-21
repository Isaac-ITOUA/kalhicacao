-- Add policy for authenticated users to delete orders
CREATE POLICY "Authenticated users can delete orders"
ON public.customer_orders
FOR DELETE
TO authenticated
USING (true);

-- Add policy for authenticated users to update orders  
CREATE POLICY "Authenticated users can update orders"
ON public.customer_orders
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
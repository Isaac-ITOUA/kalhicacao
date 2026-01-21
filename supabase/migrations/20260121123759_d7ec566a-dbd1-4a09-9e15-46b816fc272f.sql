-- Add status column to customer_orders table
ALTER TABLE public.customer_orders 
ADD COLUMN status TEXT NOT NULL DEFAULT 'pending' 
CHECK (status IN ('pending', 'validated', 'cancelled'));
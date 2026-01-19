-- Create customer_orders table
CREATE TABLE public.customer_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  product TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.customer_orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert orders (public form)
CREATE POLICY "Anyone can create orders"
ON public.customer_orders
FOR INSERT
WITH CHECK (true);

-- Only authenticated users can view orders
CREATE POLICY "Authenticated users can view orders"
ON public.customer_orders
FOR SELECT
TO authenticated
USING (true);
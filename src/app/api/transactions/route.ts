import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Transaction from '@/lib/models/transaction';

// Make sure this function is properly exported for Next.js App Router
export async function GET(request: NextRequest) {
  try {
    // Log the request to help with debugging
    console.log('API: GET /api/transactions request received');
    
    await dbConnect();
    console.log('API: Database connected successfully');
    
    const transactions = await Transaction.find({}).sort({ date: -1 });
    console.log(`API: Found ${transactions.length} transactions`);
    
    // Return with proper headers
    return new NextResponse(JSON.stringify(transactions), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('API: Error fetching transactions:', error);
    
    // Return detailed error for debugging
    return new NextResponse(
      JSON.stringify({ 
        error: 'Failed to fetch transactions',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('API: POST /api/transactions request received');
    
    const body = await request.json();
    console.log('API: Request body parsed:', body);
    
    await dbConnect();
    console.log('API: Database connected successfully');
    
    const transaction = await Transaction.create(body);
    console.log('API: Transaction created successfully:', transaction._id);
    
    return new NextResponse(JSON.stringify(transaction), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('API: Error creating transaction:', error);
    
    return new NextResponse(
      JSON.stringify({ 
        error: 'Failed to create transaction',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
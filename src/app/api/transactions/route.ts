import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Transaction from '@/lib/models/transaction';


export async function GET(request: NextRequest) {
  try {
  
    await dbConnect();
    
    const transactions = await Transaction.find({}).sort({ date: -1 });
   
    
    // Return with  headers
    return new NextResponse(JSON.stringify(transactions), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    
    
    // Return error for debugging
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
  
    
    const body = await request.json();
    
    
    await dbConnect();
   
    
    const transaction = await Transaction.create(body);
  
    
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
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Budget from '@/lib/models/budget';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Get month from query params or use current month
    const url = new URL(request.url);
    const month = url.searchParams.get('month');
    
    const query = month ? { month } : {};
    const budgets = await Budget.find(query).sort({ category: 1 });
    
    return NextResponse.json(budgets);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch budgets' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await dbConnect();
    
    // Check if budget for this category and month already exists
    const existingBudget = await Budget.findOne({
      category: body.category,
      month: body.month,
    });
    
    if (existingBudget) {
      // Update existing budget
      existingBudget.amount = body.amount;
      await existingBudget.save();
      return NextResponse.json(existingBudget);
    } else {
      // Create new budget
      const budget = await Budget.create(body);
      return NextResponse.json(budget, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating budget:', error);
    return NextResponse.json(
      { error: 'Failed to create budget' },
      { status: 500 }
    );
  }
}
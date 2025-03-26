import { NextResponse } from 'next/server';
import webpush from 'web-push';

// Configure web-push with VAPID keys
const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  privateKey: process.env.VAPID_PRIVATE_KEY!,
  subject: 'mailto:notifications@caipo.ai'
};

webpush.setVapidDetails(
  vapidKeys.subject,
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export async function POST(request: Request) {
  try {
    const subscription = await request.json();

    // Store the subscription in your database
    // This is where you would typically save the subscription to your database
    // For now, we'll just log it
    console.log('Received push subscription:', subscription);

    // Send a test notification
    const payload = JSON.stringify({
      title: 'Welcome to CAIPO!',
      body: 'You have successfully subscribed to notifications.',
      icon: '/android-chrome-192x192.png'
    });

    await webpush.sendNotification(subscription, payload);

    return NextResponse.json({ 
      message: 'Subscription successful',
      success: true 
    });
  } catch (error) {
    console.error('Push subscription failed:', error);
    return NextResponse.json(
      { 
        message: 'Subscription failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 
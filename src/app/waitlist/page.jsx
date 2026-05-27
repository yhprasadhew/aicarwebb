import React from 'react';

const WaitlistPage = () => {
  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden">
      {/* Waitlist iframe - takes full remaining space */}
      <iframe
        className="flex-1 w-full border-0"
        src="https://ac3fb9fc-07d0-4847-8541-b63bf9e7054c.created.app"
        title="AUTODRIVE Waitlist"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default WaitlistPage;
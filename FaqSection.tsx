import React from 'react';

const FaqSection: React.FC = () => {
  const faqs = [
    {
      q: "My Vercel says 'No Production Deployment' - What do I do?",
      a: "This means the build failed. Click the 'Deployments' tab in Vercel (next to Overview), click the latest failed deployment, and then click 'Build Logs'. It will tell you exactly which line of code caused the error."
    },
    {
      q: "How do I get the 'Visit' button?",
      a: "The 'Visit' button only appears after a SUCCESSFUL build. Check the logs, fix any errors, and Vercel will automatically try to build it again."
    },
    {
      q: "Is Gemini 100% free to use?",
      a: "Google has a free tier for Gemini, but for a business app, you should use the 'Pay-as-you-go' tier to avoid rate limits. You only pay for what you use!"
    },
    {
      q: "Can I use this on my mobile phone?",
      a: "Yes! Since it's deployed to a URL, you can open it in any mobile browser or pin it to your home screen for an app-like experience."
    }
  ];

  return (
    <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden p-12">
      <div className="flex items-center gap-5 mb-10">
        <div className="w-14 h-14 bg-[#003366] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#003366]/20">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Deployment & Support</h2>
          <p className="text-[#005DAA] font-bold text-sm uppercase tracking-widest">Florida Cloud Technical Assistance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {faqs.map((faq, i) => (
          <div key={i} className="group p-8 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
            <h4 className="font-black text-[#003366] mb-3 flex items-start gap-3 text-lg">
              <span className="text-[#005DAA] font-black italic select-none">Q.</span>
              {faq.q}
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed font-semibold pl-8 border-l-2 border-slate-100">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
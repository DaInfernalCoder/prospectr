"use client";

import Link from "next/link";

const ContactCard = ({ icon, title, linkText, href, onClick }) => {
  return (
    <div className="bg-zinc-900/50 rounded-xl p-6 flex flex-col items-center transition-all duration-300 hover:bg-zinc-900 hover:shadow-lg">
      <div className="bg-blue-600/20 rounded-full p-4 mb-4">
        {icon}
      </div>
      <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
      <Link 
        href={href} 
        target={href.startsWith("http") ? "_blank" : "_self"} 
        rel={href.startsWith("http") ? "noopener noreferrer" : ""}
        className="text-blue-500 hover:text-blue-400 transition-colors"
        onClick={onClick}
      >
        {linkText}
      </Link>
    </div>
  );
};

const ContactSection = () => {
  return (
    <section className="bg-black relative py-24" id="contact">
      {/* Gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl transform rotate-12 opacity-30"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="sm:text-5xl text-4xl font-extrabold text-blue-500 mb-8">
            Get in Touch
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            We&apos;d love to hear your feedbacks and suggestions, we answer to everyone and make some suggestions into features :)
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <ContactCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14a1.75 1.75 0 0 1-1.75 1.75H1.75A1.75 1.75 0 0 1 0 18.75v-14C0 3.784.784 3 1.75 3ZM1.5 7.412V18.75c0 .138.112.25.25.25h20.5a.25.25 0 0 0 .25-.25V7.412l-9.52 6.433c-.592.4-1.368.4-1.96 0Zm0-2.662v.852l10.36 7a.25.25 0 0 0 .28 0l10.36-7V4.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25Z"/>
              </svg>
            } 
            title="Email" 
            linkText="dattasumit2019@gmail.com" 
            href="mailto:dattasumit2019@gmail.com" 
          />
          
          <ContactCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            } 
            title="Twitter" 
            linkText="@InfernalSumit" 
            href="https://x.com/InfernalSumit" 
          />
          
          <ContactCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                <path d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12 17.799 1.5 12 1.5zM12 5.75c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25S10.75 7.69 10.75 7s.56-1.25 1.25-1.25zM14 18h-4v-1h1v-5.5h-1v-1h3v6.5h1v1z" fillRule="evenodd" clipRule="evenodd"/>
              </svg>
            } 
            title="Live Chat" 
            linkText="Chat with us now" 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // This would trigger Crisp chat if implemented
              if (typeof window !== 'undefined' && window.$crisp) {
                window.$crisp.push(['do', 'chat:open']);
              } else {
                alert("Live chat is currently offline. Please email us instead.");
              }
            }}
          />
        </div>
        
        <div className="text-center mt-16">
          <p className="text-zinc-400">
            Our support team is available Monday-Friday, 9am-5pm PST.
            <br />
            For urgent inquiries outside of business hours, please use the live chat.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 
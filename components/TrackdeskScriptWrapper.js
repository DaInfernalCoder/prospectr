"use client";

import { useEffect } from "react";

export default function TrackdeskScriptWrapper() {
  useEffect(() => {
    // For tracking clicks
    (function(t,d,k){(t[k]=t[k]||[]).push(d);t[d]=t[d]||t[k].f||function(){(t[d].q=t[d].q||[]).push(arguments)}})(window,"trackdesk","TrackdeskObject");
    // Call trackdesk safely through window object
    window.trackdesk('leadsprospectr', 'click');
    
    // For handling client reference ID
    const handleClientReferenceId = () => {
      var cookie = document.cookie.match('(^|;)\\s*trakdesk_cid\\s*=\\s*([^;]+)');
      if (Array.isArray(cookie)) {
        try {
          var trakdeskCid = JSON.parse(cookie.pop());
          var cid = trakdeskCid['cid'];
          document.querySelectorAll('a[href^="https://buy.stripe.com/"]').forEach(function (a) {
            var url = new URL(a.href);
            url.searchParams.set('client_reference_id', cid);
            a.href = url.href;
          });
        } catch (e) {
          console.log(e);
        }
      }
    };

    // Execute immediately and also set up a MutationObserver to catch dynamically added links
    handleClientReferenceId();
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          handleClientReferenceId();
        }
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Clean up observer on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
} 
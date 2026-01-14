import { useEffect, useState } from "react";

export function useCircleAnimations(view) {
  const [showContent, setShowContent] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isShrinking, setIsShrinking] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (view === "welcome") {
      const timer = setTimeout(() => setShowWelcome(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShowWelcome(false);
    }
  }, [view]);

  return {
    showContent,
    showWelcome,
    isShrinking,
    setIsShrinking,
  };
}

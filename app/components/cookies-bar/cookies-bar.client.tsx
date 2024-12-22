import { useState } from "react";

export const CookiesBar = () => {
  const [isOpen, setIsOpen] = useState(localStorage.getItem('cookies-bar-accepted') !== 'true');

  if (!isOpen) {
    return null;
  }

  const handleAccept = () => {
    localStorage.setItem('cookies-bar-accepted', 'true');
    setIsOpen(false);
  };

  return (
    <div className="flex flex-row items-center justify-between border-t border-gray-200 dark:border-gray-800 fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 p-4">
      <p className="grow text-center text-sm text-gray-500 dark:text-gray-400 font-regular">
        We use cookies to ensure you get the best experience on our website.
      </p>
      <button className="button" onClick={handleAccept}>Accept</button>
    </div>
  );
}

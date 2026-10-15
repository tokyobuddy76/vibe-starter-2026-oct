import React from 'react';

interface FooterProps {
  onSelectSection: (section: string) => void;
  onOpenSubscribe: () => void;
  onOpenCooking: () => void;
  onOpenWirecutter: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectSection,
  onOpenSubscribe,
  onOpenCooking,
  onOpenWirecutter
}) => {
  return (
    <footer
      className="border-t-2 border-black max-w-[1240px] mx-auto px-4 py-6 font-sansText text-nyt-grayMuted text-[11px]"
      data-purpose="site-footer"
    >
      <div className="flex flex-col md:flex-row items-center justify-between pb-6 border-b border-nyt-border gap-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              onSelectSection('Front Page');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer text-left"
          >
            <span className="masthead-title text-2xl text-black hover:opacity-80 transition-opacity">
              The New York Times
            </span>
          </button>
        </div>

        <div className="flex flex-wrap gap-4 text-[12px] text-nyt-black font-semibold">
          <button
            onClick={() => onSelectSection('U.S.')}
            className="hover:underline cursor-pointer"
          >
            NEWS
          </button>
          <button
            onClick={() => onSelectSection('Opinion')}
            className="hover:underline cursor-pointer"
          >
            OPINION
          </button>
          <button
            onClick={() => onSelectSection('Arts')}
            className="hover:underline cursor-pointer"
          >
            ARTS
          </button>
          <button
            onClick={() => onSelectSection('Lifestyle')}
            className="hover:underline cursor-pointer"
          >
            LIVING
          </button>
          <button
            onClick={() => onSelectSection('Business')}
            className="hover:underline cursor-pointer"
          >
            LISTINGS &amp; MORE
          </button>
          <button
            onClick={onOpenCooking}
            className="hover:underline cursor-pointer"
          >
            COOKING
          </button>
          <button
            onClick={onOpenWirecutter}
            className="hover:underline cursor-pointer"
          >
            WIRECUTTER
          </button>
        </div>
      </div>

      {/* Legal and Links */}
      <div className="pt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-center text-[10px]">
        <p>© 2026 The New York Times Company</p>
        <span className="hover:underline cursor-pointer">NYTCo</span>
        <span className="hover:underline cursor-pointer">Contact Us</span>
        <span className="hover:underline cursor-pointer">Accessibility</span>
        <span className="hover:underline cursor-pointer">Work with us</span>
        <span className="hover:underline cursor-pointer">Advertise</span>
        <span className="hover:underline cursor-pointer">T Brand Studio</span>
        <span className="hover:underline cursor-pointer">Your Ad Choices</span>
        <span className="hover:underline cursor-pointer">Privacy Policy</span>
        <span className="hover:underline cursor-pointer">Terms of Service</span>
        <span className="hover:underline cursor-pointer">Site Map</span>
        <span className="hover:underline cursor-pointer">Help</span>
        <button
          onClick={onOpenSubscribe}
          className="hover:underline cursor-pointer text-nyt-black font-semibold"
        >
          Subscriptions
        </button>
      </div>
    </footer>
  );
};

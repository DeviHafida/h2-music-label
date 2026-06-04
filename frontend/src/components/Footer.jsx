export default function Footer() {
  return (
    <footer className="border-t border-[#1a2e1a] py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="font-mono font-bold text-[#39e07a] text-base">H2 Music Label.</div>
          <div className="text-xs text-[#4d7a4d] mt-1">© 2024 H2 Music Label. Built on Blockchain.</div>
        </div>
        <div className="flex items-center gap-5">
          {['Terms of Service', 'Privacy Policy', 'Docs', 'Support'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs text-[#8aaa8a] hover:text-[#39e07a] transition-colors duration-150"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

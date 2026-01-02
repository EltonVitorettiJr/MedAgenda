const Footer = () => {
  return (
    <footer className="bg-gray-200 p-4 flex items-center justify-center border border-t-gray-400">
      <p className="mt-8 text-center text-sm text-gray-500">
        Dr. Omar © {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;

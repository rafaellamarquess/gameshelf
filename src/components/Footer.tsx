const Footer = () => {
  return (
    <footer className="bg-black-900 text-white text-center p-4 fixed bottom-0 w-full">
      <p>&copy; {new Date().getFullYear()} GameShelf - Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;

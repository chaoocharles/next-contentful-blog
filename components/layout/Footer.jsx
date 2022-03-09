const Footer = () => {
  return (
    <div className="footer">
      <p>All rights reserved</p>

      <style jsx>
        {`
          .footer {
            height: 120px;
            background: #383838;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </div>
  );
};

export default Footer;

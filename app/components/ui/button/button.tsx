interface ButtonProps {
  children: React.ReactNode;
}

export const Button = ({ children,  ...props }: ButtonProps) => {
  return <button className="button" {...props}>{children}</button>;
};

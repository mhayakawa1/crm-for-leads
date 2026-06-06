interface ContainerProps {
  children?: React.ReactNode;
  title: string;
}

export function AnalyticsContainer({ children, title }: ContainerProps) {
  return (
    <div className="border border-solid">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}

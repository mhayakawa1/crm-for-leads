interface ContainerProps {
  children?: React.ReactNode;
}

export function AnalyticsContainer({ children }: ContainerProps) {
  return (
    <div className="border border-gray-300 rounded-lg">
      <div>{children}</div>
    </div>
  );
}

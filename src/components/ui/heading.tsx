export default function Heading({ children, ...props }) {
  return (
    <p
      {...props}
      className={
        "text-lg font-semibold leading-none tracking-tight " +
          props.className || ""
      }
    >
      {children}
    </p>
  );
}

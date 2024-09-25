interface SignUpInterface {
  children: React.ReactNode;
  id: string;
}

export const SignUpModal = ({ children, id }: SignUpInterface) => {
  return (
    <dialog
      popover="auto"
      id={id}
      className="rounded-xl backdrop:backdrop-blur-[2px] drop-shadow-md backdrop:pointer-events-none"
    >
      {children}
    </dialog>
  );
};

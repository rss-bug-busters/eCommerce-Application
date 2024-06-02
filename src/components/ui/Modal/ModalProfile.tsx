import { FC } from 'react';

interface ModalProperties {
  active: boolean;
  children: React.ReactNode;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalProfile: FC<ModalProperties> = function ({ active, setActive, children }) {
  return active ? (
    <div
      className="flex items-center justify-center bg-gray-800 bg-opacity-30 fixed top-0 left-0 w-screen h-screen"
      onClick={() => setActive(false)}
      onKeyDown={(event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
          setActive(false);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div
        className="p-4 bg-slate-100 rounded-2xl absolute "
        onClick={(event: React.MouseEvent) => event.stopPropagation()}
        onKeyDown={(event: React.KeyboardEvent) => event.stopPropagation()}
        role="button"
        tabIndex={0}
      >
        {children}
      </div>
    </div>
  ) : undefined;
};

export default ModalProfile;

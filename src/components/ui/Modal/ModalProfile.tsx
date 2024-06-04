import { FC } from 'react';

interface ModalProperties {
  active: boolean;
  children: React.ReactNode;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalProfile: FC<ModalProperties> = function ({ active, setActive, children }) {
  return active ? (
    <div
      className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-gray-800 bg-opacity-30"
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
        className="absolute rounded-2xl bg-slate-100 p-4 "
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

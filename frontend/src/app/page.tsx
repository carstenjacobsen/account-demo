'use client';
import Header from "./components/Header"
import {useUserNameStore} from './store/userName';

export default function Home() {

  const userName = useUserNameStore((state) => state.userName)

  return (
      <div>
        <Header />
          <div className="py-32 text-center">
            {userName && (
              <h2 className="font-extrabold text-4xl">Hello {userName}!</h2>
            )}
          </div>
      </div>
  );
}

'use client';
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from '@/app/firebase/config';

export default function Home() {
  const [user] = useAuthState(auth);

  console.log(user);

  return (
    <div className="flex flex-col justify-center">
      <div className="w-1/2 m-auto">
        <h1 className="roboto-regular text-2xl pb-5">A New Community</h1>
        <p>
          &emsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
          ipsum dolor sit amet consectetur adipiscing elit duis. Dui vivamus
          arcu felis bibendum ut tristique et. Dictumst quisque sagittis purus
          sit amet volutpat consequat mauris. Ut faucibus pulvinar elementum
          integer enim neque volutpat.Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore
          magna aliqua. Dui ut ornare lectus sit amet. Nulla facilisi morbi
          tempus iaculis. Mi in nulla posuere sollicitudin aliquam ultrices. Sed
          nisi lacus sed viverra tellus in hac.
        </p>

        <p>
          &emsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna
          molestie at elementum eu. Accumsan tortor posuere ac ut consequat
          semper viverra nam libero. Feugiat scelerisque varius morbi enim nunc.
          Morbi tristique senectus et netus et. Sit amet risus nullam eget felis
          eget. Maecenas sed enim ut sem viverra aliquet eget sit amet.
        </p>

        <p>
          &emsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec
          tincidunt praesent semper feugiat nibh sed pulvinar. Ut tristique et
          egestas quis. Morbi tincidunt ornare massa eget egestas purus viverra
          accumsan in. At ultrices mi tempus imperdiet nulla malesuada
          pellentesque elit. Et netus et malesuada fames ac turpis egestas sed.
          Sed cras ornare arcu dui vivamus. Ornare suspendisse sed nisi lacus
          sed viverra tellus. Ornare aenean euismod elementum nisi quis. Elit
          duis tristique sollicitudin nibh sit amet commodo nulla. Augue eget
          arcu dictum varius duis at consectetur. Volutpat blandit aliquam etiam
          erat velit. Phasellus egestas tellus rutrum tellus pellentesque eu
          tincidunt. Nunc sed id semper risus in hendrerit gravida.
        </p>
        <p>
          &emsp;Libero volutpat sed cras ornare arcu dui vivamus. Tortor
          condimentum lacinia quis vel eros. Adipiscing elit duis tristique
          sollicitudin nibh sit amet commodo. Adipiscing elit duis tristique
          sollicitudin. Lobortis scelerisque fermentum dui faucibus. Vel
          fringilla est ullamcorper eget nulla. Mattis rhoncus urna neque
          viverra justo nec ultrices dui sapien. Mi ipsum faucibus vitae aliquet
          nec ullamcorper sit. Netus et malesuada fames ac. Et ultrices neque
          ornare aenean. At in tellus integer feugiat. Consequat mauris nunc
          congue nisi vitae. Nisl condimentum id venenatis a condimentum.
          Rhoncus dolor purus non enim.
        </p>
        <p>
          &emsp;Interdum velit laoreet id donec. Eros donec ac odio tempor orci
          dapibus ultrices in. Vitae nunc sed velit dignissim sodales ut eu sem.
          Cursus in hac habitasse platea dictumst quisque sagittis purus. Arcu
          dictum varius duis at consectetur lorem donec. Donec adipiscing
          tristique risus nec feugiat in fermentum posuere urna. Pharetra sit
          amet aliquam id. Id venenatis a condimentum vitae sapien pellentesque
          habitant morbi tristique. Donec massa sapien faucibus et molestie.
          Orci porta non pulvinar neque laoreet suspendisse interdum. Quis
          lectus nulla at volutpat diam ut. Mollis aliquam ut porttitor leo a.
          Scelerisque felis imperdiet proin fermentum leo vel orci. At imperdiet
          dui accumsan sit amet nulla facilisi. Ornare aenean euismod elementum
          nisi. Integer eget aliquet nibh praesent tristique magna sit. Duis ut
          diam quam nulla porttitor massa.
        </p>
      </div>
    </div>
  );
}

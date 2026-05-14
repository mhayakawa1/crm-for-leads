// "use client";
// import App from "../../App.js";
// import "./../index.css"

// export default function Page() {
//   return (
//     <div className="h-[100vh] border border-solid flex justify-center items-center p-8 max-w-4xl mx-auto space-y-4">
//       <App />
//     </div>
//   );
// }
"use client";

import dynamic from "next/dynamic";

const CRAApp = dynamic(() => import("../../App"), { ssr: false });

export default function CatchAllPage() {
  return <CRAApp />;
}

// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   useAuthStore,
// } from "@/store/authStore";

// import {
//   getPledgeUrl,
// } from "../services/give.service";

// export default function usePledgesAndDonations() {
//   const [
//     actions,
//   ] = useState([
//     {
//       id: 1,
//       header:
//         "Make a new Pledge",
//       subText:
//         "Click to make a new pledge",
//       type:
//         "make",
//     },

//     {
//       id: 2,
//       header:
//         "Redeem a Pledge",
//       subText:
//         "Pay for pledges you have made",
//       type:
//         "redeem",
//     },
//   ]);

//   const [
//     pledgeUrl,
//     setPledgeUrl,
//   ] = useState("");

//   const user =
//     useAuthStore(
//       state => state.user
//     );

//   const tenantId =
//     user?.tenantID ||
//     user?.tenantId;

//   useEffect(() => {
//     const loadPledgeUrl =
//       async () => {
//         try {
//           const url =
//             await getPledgeUrl(
//               tenantId
//             );

//           console.log(
//             "PLEDGE URL:",
//             url
//           );

//           setPledgeUrl(
//             url || ""
//           );
//         } catch (error) {
//           console.log(
//             "PLEDGE ERROR:",
//             error
//           );
//         }
//       };

//     if (tenantId) {
//       loadPledgeUrl();
//     }
//   }, [tenantId]);

//   return {
//     actions,
//     pledgeUrl,
//   };
// }

import { useState } from "react";

import { useChurchStore } from "@/store/churchStore";

import { getPledgeLinks } from "../utils/givingProfile";

// Two different pages exist on the church's profile:
//   pledgePromiseUrl -> make a new pledge
//   pledgeDueUrl     -> pay (redeem) a pledge already made
// This used to fetch only pledgePromiseUrl and send BOTH actions to
// it, so "Redeem a Pledge" opened the make-a-pledge page. It also
// read the church id from the signed-in user, so a guest got no link
// at all. Both links now come from the profile already loaded at
// startup.
export default function usePledgesAndDonations() {
  const [actions] = useState([
    {
      id: 1,
      header: "Make a new Pledge",
      subText:
        "Click to make a new pledge",
      type: "make",
    },

    {
      id: 2,
      header: "Redeem a Pledge",
      subText:
        "Pay for pledges you have made",
      type: "redeem",
    },
  ]);

  const fullProfile = useChurchStore(
    state => state.fullProfile
  );

  const links =
    getPledgeLinks(fullProfile);

  const urlFor = (
    type: string
  ) =>
    type === "make"
      ? links.make
      : links.pay;

  return {
    // Only the actions that have a page to open — no dead taps.
    actions: actions.filter(
      action =>
        urlFor(action.type)
    ),

    urlFor,
  };
}

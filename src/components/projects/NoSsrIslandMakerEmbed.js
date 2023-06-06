import dynamic from "next/dynamic";

const NoSsrIslandMakerEmbed = dynamic(() => import("./IslandMakerEmbed"), {
  ssr: false,
});

export default NoSsrIslandMakerEmbed;

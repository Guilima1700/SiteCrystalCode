import { ImageResponse } from "next/og";

export const alt =
  "CrystalCode — desenvolvimento de software e produtos digitais";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: 88,
        background: "#0c1e28",
        color: "white",
        borderBottom: "12px solid #63b9c1",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 36,
          color: "#63b9c1",
          marginBottom: 34,
        }}
      >
        CrystalCode
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 66,
          fontWeight: 700,
          lineHeight: 1.1,
          maxWidth: 1000,
        }}
      >
        Software sob medida. Produtos digitais para o seu negócio.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 25,
          color: "#b8c4c8",
          marginTop: 36,
        }}
      >
        Sistemas · Plataformas web · SaaS · Automação
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 22,
          color: "#63b9c1",
          marginTop: 38,
        }}
      >
        crystalcode.com.br
      </div>
    </div>,
    size,
  );
}

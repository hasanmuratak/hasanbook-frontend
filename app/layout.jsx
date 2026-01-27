// app/layout.jsx
import EmotionRegistry from "./providers/EmotionRegistry";
import ClientLayout from "./components/ClientLayout";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <EmotionRegistry>
          <ClientLayout>
            {children}
          </ClientLayout>
        </EmotionRegistry>
      </body>
    </html>
  );
}

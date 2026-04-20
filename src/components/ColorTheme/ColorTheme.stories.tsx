import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../Button";
const meta: Meta = {
  title: "Theme/Color Palette",
};

export default meta;
type Story = StoryObj;

const colorRoles = [
  { name: "primary", label: "Primary" },
  { name: "neutral", label: "Neutral" },
  { name: "info", label: "Info" },
  { name: "success", label: "Success" },
  { name: "warning", label: "Warning" },
  { name: "danger", label: "Danger" },
];

const tokenGroups = [
  {
    label: "Background",
    tokens: ["background-default", "background-tinted"],
  },
  {
    label: "Surface",
    tokens: ["surface-default", "surface-tinted", "surface-hover", "surface-active"],
  },
  {
    label: "Border",
    tokens: ["border-subtle", "border-default", "border-strong"],
  },
  {
    label: "Text",
    tokens: ["text-subtle", "text-default"],
  },
  {
    label: "Base",
    tokens: [
      "base-default",
      "base-hover",
      "base-active",
      "base-contrast-subtle",
      "base-contrast-default",
    ],
  },
] as const;

export const ColorTheme: Story = {
  render: function Render() {
    const [isDark, setIsDark] = useState(false);

    const headerStyle: React.CSSProperties = {
      fontSize: "0.625rem",
      fontWeight: 500,
      textAlign: "center",
      padding: "2px 4px",
      whiteSpace: "nowrap",
      opacity: 0.7,
    };

    const groupHeaderStyle: React.CSSProperties = {
      fontSize: "0.625rem",
      fontWeight: 700,
      textAlign: "center",
      padding: "4px 4px 2px",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      opacity: 0.5,
    };

    return (
      <div
        data-color-scheme={isDark ? "dark" : "light"}
        style={{
          padding: "2rem",
          backgroundColor: "var(--ds-color-neutral-background-default)",
          color: "var(--ds-color-neutral-text-default)",
          minHeight: "100vh",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <h1 style={{ margin: 0, fontSize: "1.25rem" }}>NRK Color Theme</h1>
          <Button
            variant={isDark ? "outline" : "default"}
            size="sm"
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? "Switch to Light" : "Switch to Dark"}
          </Button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              {/* Group header row */}
              <tr>
                <th />
                {tokenGroups.map((group) => (
                  <th
                    key={group.label}
                    colSpan={group.tokens.length}
                    style={{
                      ...groupHeaderStyle,
                      borderBottom: "2px solid var(--ds-color-neutral-border-subtle)",
                      borderLeft: "4px solid var(--ds-color-neutral-background-default)",
                    }}
                  >
                    {group.label}
                  </th>
                ))}
              </tr>
              {/* Token name row */}
              <tr>
                <th style={{ ...headerStyle, textAlign: "left", paddingRight: "1rem" }}>Role</th>
                {tokenGroups.map((group) =>
                  group.tokens.map((token, i) => (
                    <th
                      key={token}
                      style={{
                        ...headerStyle,
                        borderLeft:
                          i === 0
                            ? "4px solid var(--ds-color-neutral-background-default)"
                            : undefined,
                      }}
                    >
                      {token.replace(`${group.label.toLowerCase()}-`, "").replace(/-/g, "\u2011")}
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {colorRoles.map((role) => (
                <tr key={role.name}>
                  <td
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      paddingRight: "1rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {role.label}
                  </td>
                  {tokenGroups.map((group) =>
                    group.tokens.map((token, i) => (
                      <td
                        key={token}
                        style={{
                          padding: "2px",
                          borderLeft:
                            i === 0
                              ? "4px solid var(--ds-color-neutral-background-default)"
                              : undefined,
                        }}
                      >
                        <div
                          title={`--ds-color-${role.name}-${token}`}
                          style={{
                            backgroundColor: `var(--ds-color-${role.name}-${token})`,
                            width: "100%",
                            height: "2rem",
                            borderRadius: "3px",
                            border: "1px solid rgba(0,0,0,0.08)",
                            minWidth: "3.5rem",
                          }}
                        />
                      </td>
                    ))
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div
          style={{
            marginTop: "1.5rem",
            fontSize: "0.75rem",
            opacity: 0.6,
          }}
        >
          Hover cells to see token name. All values from{" "}
          <code>--ds-color-[role]-[token]</code>.
        </div>
      </div>
    );
  },
};

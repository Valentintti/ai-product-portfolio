import {
  ArrowUpRightIcon,
  DownloadSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";

type Props = {
  href: string;
  label: string;
  icon: "external" | "download" | "github" | "linkedin";
  download?: boolean;
};

const icons = {
  external: ArrowUpRightIcon,
  download: DownloadSimpleIcon,
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
};

export default function ActionLink({ href, label, icon, download }: Props) {
  const Icon = icons[icon];
  const external = href.startsWith("http");
  return (
    <a
      className="action-link"
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {label}
      <Icon weight="bold" aria-hidden="true" />
    </a>
  );
}

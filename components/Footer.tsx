import Link from "next/link";
import Image from "next/image";
import { siteContent } from "@/lib/content";

export default function Footer() {
  const { contact, navigation } = siteContent;
  return (
    <footer className="border-t hairline bg-carbon/40">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Image
              src="/img/logo.png"
              alt="Caffè Vero"
              width={150}
              height={30}
              className="brightness-0 invert h-6 w-auto"
            />
            <p className="mt-6 max-w-xs text-sm font-light text-smoke">
              Talianska káva a anglický čaj. {siteContent.brand.philosophy}
            </p>
          </div>

          <nav aria-label="Navigácia v pätičke">
            <h2 className="eyebrow">Menu</h2>
            <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-light text-smoke transition-colors duration-300 hover:text-bronze"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow">Kontakt</h2>
            <address className="mt-6 space-y-1 text-sm font-light not-italic text-smoke">
              <p className="text-cream">{contact.company}</p>
              <p>
                {contact.street}, {contact.city}
              </p>
              <div className="pt-3 space-y-1">
                {contact.phones.map((phone) => (
                  <p key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="transition-colors duration-300 hover:text-bronze"
                    >
                      {phone}
                    </a>
                  </p>
                ))}
                <p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-bronze transition-colors duration-300 hover:text-cream"
                  >
                    {contact.email}
                  </a>
                </p>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t hairline pt-8 text-xs font-light text-smoke md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {contact.company} Všetky práva vyhradené.
          </p>
          <p>Košice, Slovensko</p>
        </div>
      </div>
    </footer>
  );
}

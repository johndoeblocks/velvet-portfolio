"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import {
  Mail,
  Phone,
  Github,
  Linkedin,
  GraduationCap,
  Briefcase,
  Code,
  Languages,
  Download,
  Award,
} from "lucide-react";
import {
  certificates,
  cvProfile,
  education,
  experiences,
  featuredProjects,
  flatSkills,
  skillGroups,
} from "@/lib/cv-data";

const Index = () => {
  const cvRef = useRef<HTMLDivElement>(null);
  const pdfPagesRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    if (!pdfPagesRef.current || isDownloading) {
      return;
    }

    setIsDownloading(true);

    try {
      if ("fonts" in document) {
        await document.fonts.ready;
      }

      await new Promise((resolve) => requestAnimationFrame(resolve));

      const pages = Array.from(
        pdfPagesRef.current?.querySelectorAll<HTMLElement>("[data-pdf-page='true']") ?? [],
      );
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (const [pageIndex, page] of pages.entries()) {
        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: "#ffffff",
          logging: false,
          scrollX: 0,
          scrollY: 0,
          windowWidth: page.scrollWidth,
          windowHeight: page.scrollHeight,
        });

        if (pageIndex > 0) {
          pdf.addPage();
        }

        pdf.addImage(canvas.toDataURL("image/jpeg", 0.98), "JPEG", 0, 0, pageWidth, pageHeight);
      }

      pdf.save("joao-manteigas-cv.pdf");
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#1f2937_0%,#0b1120_40%,#020617_100%)] py-10 px-4 sm:px-6 lg:px-8 print:py-0 print:px-0 print:bg-white">
      {/* Download Button */}
      <button
        onClick={handleDownloadPdf}
        disabled={isDownloading}
        className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-70 print:hidden"
      >
        <Download className="w-4 h-4" />
        {isDownloading ? "Generating PDF..." : "Download PDF"}
      </button>

      <article
        id="cv-content"
        ref={cvRef}
        className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200/70 bg-white text-brand-ink shadow-2xl shadow-black/30 print:max-w-none print:rounded-none print:border-0 print:shadow-none"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">
          <aside className="bg-brand-dark px-8 py-10 text-brand-inverse print:bg-brand-dark print:text-brand-inverse">
            <header className="mb-10">
              <img
                src={"/profile-picture.png"}
                alt="João Manteigas"
                className="mb-5 h-28 w-28 rounded-2xl object-cover ring-2 ring-cyan-300/60"
              />

              <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                João Manteigas
              </h1>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-cyan-200/90">
                {cvProfile.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {cvProfile.subtitle}
              </p>
            </header>

            <section className="space-y-3 text-sm">
              <a
                href="tel:969370801"
                className="flex items-center gap-2.5 text-slate-200 transition hover:text-white"
              >
                <Phone className="h-4 w-4 text-cyan-300" /> 969 370 801
              </a>
              <a
                href="mailto:joaooliveiramanteigas@gmail.com"
                className="flex items-center gap-2.5 break-all text-slate-200 transition hover:text-white"
              >
                <Mail className="h-4 w-4 text-cyan-300" />
                joaooliveiramanteigas@gmail.com
              </a>
              <a
                href="https://github.com/johndoeblocks"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-200 transition hover:text-white"
              >
                <Github className="h-4 w-4 text-cyan-300" /> GitHub - https://github.com/johndoeblocks
              </a>
              <a
                href="https://www.linkedin.com/in/jo%C3%A3o-manteigas/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-200 transition hover:text-white"
              >
                <Linkedin className="h-4 w-4 text-cyan-300" /> LinkedIn - https://www.linkedin.com/in/joão-manteigas/
              </a>
            </section>

            <div className="my-8 h-px bg-white/14" />

            <section className="mb-8">
              <SectionTitle
                icon={<Code className="h-4 w-4" />}
                title="Core Stack"
                dark
              />
              <SkillChipList
                items={flatSkills.slice(0, 34)}
                tone="dark"
                outerClassName="mx-auto mt-4 max-w-[290px]"
              />
            </section>

            <section>
              <SectionTitle
                icon={<Languages className="h-4 w-4" />}
                title="Languages"
                dark
              />
              <div className="mt-4 space-y-2 text-sm text-slate-200">
                <p>
                  Portuguese <span className="text-slate-400">· Native</span>
                </p>
                <p>
                  English <span className="text-slate-400">· Fluent</span>
                </p>
              </div>
            </section>
          </aside>

          <main className="px-8 py-10 sm:px-10">
            <section className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="leading-relaxed text-brand-muted">{cvProfile.summary}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {cvProfile.signals.map((signal) => (
                  <span
                    key={signal}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium leading-relaxed text-brand-ink"
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </section>

            <section className="mb-10">
              <SectionTitle
                icon={<Code className="h-4 w-4" />}
                title="Technical Scope"
              />
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {skillGroups.map((group) => (
                  <div key={group.label} className="rounded-xl border border-slate-200 bg-white p-4">
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700">
                      {group.label}
                    </h3>
                    <SkillChipList items={group.skills} tone="light" />
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-10" data-pdf-break-before="true">
              <SectionTitle
                icon={<Briefcase className="h-4 w-4" />}
                title="Experience"
              />
              <div className="mt-6 space-y-7">
                {experiences.map((exp, i) => (
                  <div
                    key={`${exp.company}-${i}`}
                    data-pdf-keep="true"
                    className="grid grid-cols-1 gap-2 sm:grid-cols-[150px_1fr] sm:gap-5"
                  >
                    <div className="flex w-full max-w-[150px] flex-col gap-2 self-start">
                      {(exp.periodDetails ??
                        exp.period.map((period) => ({ date: period, label: null }))).map((period) => (
                        <div
                          key={`${period.date}-${i}`}
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2"
                        >
                          <span className="block whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-brand-ink">
                            {period.date}
                          </span>
                          {period.label && (
                            <span className="mt-1 block text-[11px] font-medium leading-snug text-brand-muted">
                              {period.label}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="border-l-2 border-slate-200 pl-4">
                      <h3 className="text-lg font-semibold text-brand-ink">
                        {exp.role}
                      </h3>
                      <p className="mb-2 text-sm font-medium text-cyan-700">
                        {exp.company}
                      </p>
                      <p className="mb-3 text-sm leading-relaxed text-brand-muted">
                        {exp.summary}
                      </p>
                      <ul className="space-y-2 text-sm leading-relaxed text-brand-muted">
                        {exp.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-2.5">
                            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan-700" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                      <SkillChipList
                        items={exp.stack}
                        tone="light"
                        outerClassName="mt-3"
                        chipClassName="font-normal"
                      />
                      {exp.company === "Velvet Neuron" && (
                        <div className="mt-5">
                          <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700">
                            Selected systems delivered through Velvet Neuron
                          </h4>
                          <div className="mt-4 grid gap-4">
                            {featuredProjects.map((project) => (
                              <article
                                key={project.name}
                                data-pdf-keep="true"
                                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                              >
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                                  <h5 className="text-base font-semibold text-brand-ink">
                                    {project.name}
                                  </h5>
                                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-700">
                                    {project.label}
                                  </p>
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                                  {project.summary}
                                </p>
                                <SkillChipList
                                  items={project.stack}
                                  tone="light"
                                  outerClassName="mt-3"
                                  chipClassName="font-normal"
                                />
                              </article>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-10">
              <SectionTitle
                icon={<GraduationCap className="h-4 w-4" />}
                title="Education"
              />
              <div className="mt-6 space-y-5">
                {education.map((edu, i) => (
                  <div
                    key={i}
                    data-pdf-keep="true"
                    className="grid grid-cols-1 gap-2 sm:grid-cols-[150px_1fr] sm:gap-5"
                  >
                    <span className="inline-flex w-fit self-start whitespace-nowrap rounded-md bg-slate-100 px-2 py-1 text-xs font-medium uppercase tracking-wide text-brand-muted">
                      {edu.period}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-brand-ink">
                        {edu.institution}
                      </h3>
                      <p className="text-sm font-medium text-cyan-700">
                        {edu.degree}
                      </p>
                      {edu.note && (
                        <p className="mt-1 text-sm text-brand-muted">
                          {edu.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-10">
              <SectionTitle
                icon={<Award className="h-4 w-4" />}
                title="Certificates"
              />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {certificates.map((certificate, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <h3 className="mb-1 text-sm font-semibold text-brand-ink">
                      {certificate.title}
                    </h3>
                    <p className="text-xs uppercase tracking-wide text-brand-muted">
                      {certificate.period}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <footer className="border-t border-slate-200 pt-5 text-center text-xs uppercase tracking-widest text-slate-400">
              João Manteigas © {new Date().getFullYear()}
            </footer>
          </main>
        </div>
      </article>
      <PdfExportLayout refNode={pdfPagesRef} />
    </div>
  );
};

const PdfExportLayout = ({
  refNode,
}: {
  refNode: React.RefObject<HTMLDivElement | null>;
}) => {
  const velvetNeuron = experiences[0];
  const middleExperiences = experiences.slice(1, 3);
  const finalExperiences = experiences.slice(3);

  return (
    <div
      ref={refNode}
      aria-hidden="true"
      className="pointer-events-none absolute left-[-10000px] top-0 flex flex-col gap-6 bg-white"
    >
      <PdfPage>
        <div className="grid h-full grid-cols-[228px_1fr] bg-white text-[#17211d]">
          <PdfSidebar />
          <main className="px-8 py-8">
            <PdfSummary />
            <PdfSectionTitle icon={<Code className="h-3.5 w-3.5" />} title="Technical Scope" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              {skillGroups.map((group) => (
                <div key={group.label} className="rounded-lg border border-slate-200 p-3">
                  <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-700">
                    {group.label}
                  </h3>
                  <PdfTags items={group.skills} />
                </div>
              ))}
            </div>
          </main>
        </div>
      </PdfPage>

      <PdfPage>
        <div className="h-full bg-white px-10 py-9 text-[#17211d]">
          <PdfSectionTitle icon={<Briefcase className="h-3.5 w-3.5" />} title="Experience" />
          <div className="mt-5">
            <PdfExperience experience={velvetNeuron} />
            <div className="mt-5">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-700">
                Selected systems delivered through Velvet Neuron
              </h4>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {featuredProjects.map((project) => (
                  <article key={project.name} className="rounded-lg border border-slate-200 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <h5 className="text-[13px] font-bold leading-tight text-[#17211d]">
                        {project.name}
                      </h5>
                      <p className="max-w-[120px] text-right text-[8px] font-bold uppercase leading-tight tracking-[0.1em] text-cyan-700">
                        {project.label}
                      </p>
                    </div>
                    <p className="mt-2 text-[10px] leading-relaxed text-[#5f675f]">
                      {project.summary}
                    </p>
                    <div className="mt-2">
                      <PdfTags items={project.stack} small />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PdfPage>

      <PdfPage>
        <div className="h-full bg-white px-10 py-9 text-[#17211d]">
          <PdfSectionTitle icon={<Briefcase className="h-3.5 w-3.5" />} title="Experience" />
          <div className="mt-5 space-y-5">
            {middleExperiences.map((experience) => (
              <PdfExperience key={experience.company} experience={experience} />
            ))}
          </div>
        </div>
      </PdfPage>

      <PdfPage>
        <div className="h-full bg-white px-10 py-9 text-[#17211d]">
          <PdfSectionTitle icon={<Briefcase className="h-3.5 w-3.5" />} title="Experience" />
          <div className="mt-5 space-y-5">
            {finalExperiences.map((experience) => (
              <PdfExperience key={experience.company} experience={experience} />
            ))}
          </div>
          <div className="mt-7 grid grid-cols-2 gap-6">
            <section>
              <PdfSectionTitle
                icon={<GraduationCap className="h-3.5 w-3.5" />}
                title="Education"
              />
              <div className="mt-4 space-y-3">
                {education.map((edu) => (
                  <div key={edu.institution} className="rounded-lg border border-slate-200 p-3">
                    <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#5f675f]">
                      {edu.period}
                    </p>
                    <h3 className="mt-1 text-[12px] font-bold leading-tight text-[#17211d]">
                      {edu.institution}
                    </h3>
                    <p className="mt-1 text-[10px] font-semibold text-cyan-700">{edu.degree}</p>
                    {edu.note && <p className="mt-1 text-[10px] text-[#5f675f]">{edu.note}</p>}
                  </div>
                ))}
              </div>
            </section>
            <section>
              <PdfSectionTitle icon={<Award className="h-3.5 w-3.5" />} title="Certificates" />
              <div className="mt-4 space-y-3">
                {certificates.map((certificate) => (
                  <div key={certificate.title} className="rounded-lg border border-slate-200 p-3">
                    <h3 className="text-[11px] font-bold leading-tight text-[#17211d]">
                      {certificate.title}
                    </h3>
                    <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#5f675f]">
                      {certificate.period}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </PdfPage>
    </div>
  );
};

const PdfPage = ({ children }: { children: React.ReactNode }) => (
  <section data-pdf-page="true" className="h-[1123px] w-[794px] overflow-hidden bg-white">
    {children}
  </section>
);

const PdfSidebar = () => (
  <aside className="h-full bg-brand-dark px-7 py-8 text-white">
    <img
      src="/profile-picture.png"
      alt="João Manteigas"
      className="mb-5 h-20 w-20 rounded-xl object-cover ring-2 ring-cyan-300/60"
    />
    <h1 className="text-[30px] font-semibold leading-[0.96] tracking-tight text-white">
      João
      <br />
      Manteigas
    </h1>
    <p className="mt-3 text-[10px] font-bold uppercase leading-snug tracking-[0.16em] text-cyan-200">
      {cvProfile.title}
    </p>
    <p className="mt-3 text-[11px] leading-relaxed text-slate-300">{cvProfile.subtitle}</p>

    <div className="my-6 h-px bg-white/15" />

    <div className="space-y-2.5 text-[10px] leading-snug text-slate-200">
      <p>969 370 801</p>
      <p className="break-all">joaooliveiramanteigas@gmail.com</p>
      <p className="break-all">github.com/johndoeblocks</p>
      <p className="break-all">linkedin.com/in/joão-manteigas</p>
    </div>

    <div className="my-6 h-px bg-white/15" />

    <PdfSectionTitle icon={<Code className="h-3 w-3" />} title="Core Stack" dark />
    <div className="mt-3">
      <PdfTags items={flatSkills.slice(0, 30)} dark small />
    </div>

    <div className="my-6 h-px bg-white/15" />

    <PdfSectionTitle icon={<Languages className="h-3 w-3" />} title="Languages" dark />
    <div className="mt-3 space-y-1.5 text-[10px] text-slate-200">
      <p>Portuguese · Native</p>
      <p>English · Fluent</p>
    </div>
  </aside>
);

const PdfSummary = () => (
  <section className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
    <p className="text-[12px] leading-relaxed text-[#5f675f]">{cvProfile.summary}</p>
    <div className="mt-3 grid grid-cols-2 gap-2">
      {cvProfile.signals.map((signal) => (
        <p
          key={signal}
          className="rounded-md border border-slate-200 bg-white px-2.5 py-2 text-[9px] font-semibold leading-relaxed text-[#17211d]"
        >
          {signal}
        </p>
      ))}
    </div>
  </section>
);

const PdfExperience = ({ experience }: { experience: (typeof experiences)[number] }) => (
  <article className="grid grid-cols-[128px_1fr] gap-4">
    <div className="space-y-2">
      {(experience.periodDetails ??
        experience.period.map((period) => ({ date: period, label: null }))).map((period) => (
        <div key={period.date} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5">
          <p className="whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.08em] text-[#17211d]">
            {period.date}
          </p>
          {period.label && (
            <p className="mt-1 text-[8px] font-semibold leading-snug text-[#5f675f]">
              {period.label}
            </p>
          )}
        </div>
      ))}
    </div>
    <div className="border-l-2 border-slate-200 pl-4">
      <h3 className="text-[15px] font-bold leading-tight text-[#17211d]">{experience.role}</h3>
      <p className="mt-1 text-[11px] font-semibold text-cyan-700">{experience.company}</p>
      <p className="mt-2 text-[11px] leading-relaxed text-[#5f675f]">{experience.summary}</p>
      <ul className="mt-2 space-y-1.5 text-[10px] leading-relaxed text-[#5f675f]">
        {experience.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-cyan-700" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
      <div className="mt-2">
        <PdfTags items={experience.stack} small />
      </div>
    </div>
  </article>
);

const PdfTags = ({
  items,
  dark,
  small,
}: {
  items: string[];
  dark?: boolean;
  small?: boolean;
}) => (
  <SkillChipList
    items={items}
    tone={dark ? "dark" : "light"}
    size="pdf"
    small={small}
  />
);

const SkillChipList = ({
  items,
  tone = "light",
  size = "web",
  small,
  outerClassName,
  innerClassName,
  chipClassName,
}: {
  items: string[];
  tone?: "dark" | "light";
  size?: "web" | "pdf";
  small?: boolean;
  outerClassName?: string;
  innerClassName?: string;
  chipClassName?: string;
}) => {
  const isPdf = size === "pdf";
  const chipBase = isPdf
    ? "inline-flex min-h-[16px] max-w-full shrink-0 items-center justify-center rounded-full px-2 text-center font-medium leading-[1.15]"
    : "inline-flex min-h-9 max-w-full shrink-0 items-center justify-center rounded-full px-3 text-center text-xs font-medium leading-[1.15]";
  const chipTone =
    tone === "dark"
      ? isPdf
        ? "border border-cyan-300/30 bg-cyan-300/10 text-[8px] text-cyan-100"
        : "border border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
      : isPdf
        ? cx("bg-slate-100 text-[#5f675f]", small ? "text-[8px]" : "text-[9px]")
        : "bg-slate-100 text-brand-muted";

  return (
    <div
      className={cx("flex w-full justify-center", outerClassName)}
      style={{ width: "100%" }}
    >
      <div
        className={cx(
          "flex w-full flex-wrap content-center items-center justify-center",
          isPdf ? "gap-0" : "gap-2",
          innerClassName,
        )}
        style={{
          alignContent: "center",
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {items.map((item) => (
          <span
            key={item}
            className={cx(chipBase, chipTone, isPdf && "m-[3px]", chipClassName)}
            style={isPdf ? { boxSizing: "border-box" } : undefined}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const PdfSectionTitle = ({
  icon,
  title,
  dark,
}: {
  icon: React.ReactNode;
  title: string;
  dark?: boolean;
}) => (
  <div className="flex items-center gap-2">
    <span className={dark ? "text-cyan-300" : "text-cyan-700"}>{icon}</span>
    <h2
      className={
        dark
          ? "text-[10px] font-bold uppercase tracking-[0.16em] text-white"
          : "text-[12px] font-bold uppercase tracking-[0.16em] text-[#17211d]"
      }
    >
      {title}
    </h2>
    <span className={dark ? "h-px flex-1 bg-white/15" : "h-px flex-1 bg-slate-200"} />
  </div>
);

const SectionTitle = ({
  icon,
  title,
  dark,
}: {
  icon: React.ReactNode;
  title: string;
  dark?: boolean;
}) => (
  <div className="flex items-center gap-2.5">
    <span className={dark ? "text-cyan-300" : "text-cyan-700"}>{icon}</span>
    <h2
      className={
        dark
          ? "text-sm font-semibold uppercase tracking-[0.14em] text-brand-inverse"
          : "text-lg font-semibold uppercase tracking-[0.14em] text-brand-ink"
      }
    >
      {title}
    </h2>
    <span
      className={dark ? "h-px flex-1 bg-white/14" : "h-px flex-1 bg-brand-border"}
    />
  </div>
);

export default Index;

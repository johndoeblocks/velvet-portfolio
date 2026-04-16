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

const skills = [
  "React",
  "NextJS",
  "JavaScript",
  "TypeScript",
  "NodeJS",
  "Java",
  "SQL",
  "Microsoft Azure",
  "Electron",
  "React Native",
  "Redux",
  "Styled Components",
  "Vitest",
  "Azure DevOps",
];

const experiences = [
  {
    period: "Dec 2024 – Jul 2025",
    role: "Frontend Developer",
    company: "Human IT | Burberry",
    description:
      "Member of Burberry’s Identity & Profile team, improving authentication (login/signup flows) and user profile experiences across a large-scale platform. Enhanced performance and scalability through codebase refactoring and improvements to shared internal libraries used across teams. Delivered UI and UX improvements on critical user flows (forms, validation, error handling) with a strong focus on mobile responsiveness. Collaborated closely with cross-functional teams to ensure reliable, secure, and high-quality user experiences.",
    //   "Joined the Identity & Profile team at Burberry, maintaining and enhancing the authentication and user profile systems. Worked on the central Identity repository (microservices architecture) and the customer-facing Profile pages. Implemented new UI features, performed extensive code refactoring to improve return patterns and reduce unnecessary data, maintained security by keeping dependencies up-to-date, and ensured full mobile responsiveness across all components. Heavily used Next.js server capabilities, writing API routes, middleware, and token validation logic.",
    //   "Contributed to the Identity and Authorization team at Burberry, implementing authentication flows, access control policies, and user management features across customer-facing platforms using Next.js, React, and Node.js all within a microservice architecture.",
  },
  {
    period: ["Jul 2025 – Oct 2025", "Feb 2024 – Nov 2024"],
    role: "Frontend & Full Stack Developer",
    company: "Boost IT | Made",
    description:
      "Contributed to the development of BeJobs, a job marketplace platform, as a full stack developer. Built and maintained RESTful APIs with NestJS and developed web and mobile applications using Next.js and React Native (TypeScript). Implemented authentication flows and application forms, and integrated push notifications across platforms. Collaborated within a cross-functional team to deliver a production-ready product used by end users." +
      "Developed a cross-platform desktop application for IoT device management using Electron, React, Node.js, and TypeScript. Built user interfaces and core logic to configure and connect devices over network, including inter-process communication (IPC) and device interaction handling. Delivered a reliable internal tool used for configuring and managing IoT devices.",

    //   "Developed the Bejobs platform, building RESTful APIs with Nest.js, a cross-platform mobile application with React Native, and the web interfaces with Next.js. Also built a cross-platform desktop application for IoT device configuration using Electron, delivering production-ready interfaces with React, Redux, and Styled Components, supported by testing with Vitest and Azure CI/CD pipelines.",
  },
  //   {
  //     period: "Jan 2024 – Present",
  //     role: "Freelancer",
  //     company: "Velvet Neuron",
  //     description:
  //       "Founded a B2B development company working directly with clients to build digital products for Web2 and Web3. Designing and developing full-stack applications, dApps, and modern web platforms while handling everything from architecture and client communication to deployment and iteration.",
  //   },
  {
    period: ["Oct 2025", "Oct 2020 – Feb 2024"],
    role: "Frontend & React Native Developer",
    company: "Syone",
    description:
      "Worked on Domino's Pizza (Norway & Sweden) as the main frontend and React Native developer across 3 repositories: Back-office (React + TypeScript + Material UI), customer-facing mobile apps (React Native), and web frontend (Next.js). Implemented key features including Google Tag Manager integration, native payment flows, full app internationalization, and led the migration of the entire frontend from Norway to Sweden. Handled daily communication with the marketing team and stakeholders for analytics and requirements. In Oct 2025, returned for a 2-week contract to revive the React Native app that had been untouched for years, and successfully restored it to a stable version.",
    //   "Developed and maintained e-commerce applications, content management systems, and backoffice platforms using React, React Native, and Next.js with Azure CI/CD. Also contracted to stabilize and restore critical e-commerce mobile applications, diagnosing issues and implementing fixes to ensure platform continuity and operational reliability.",
  },
  {
    period: "Apr 2019 – Oct 2020",
    role: "Frontend Developer",
    company: "Upbeater",
    description:
      "Sole frontend developer for an e-learning platform. Implemented course catalog, video player, quiz system, progress tracking, user & admin dashboards from Figma designs using React and Bootstrap with a mobile-first approach. Collaborated with backend colleague to deliver the project successfully.",
  },
];

const education = [
  {
    period: "Sep 2017 – Jun 2021",
    institution: "ISCTE - Instituto Universitário de Lisboa",
    degree: "Computer Science and Business Management",
    note: "GPA 4",
  },
  {
    period: "Feb 2020 – Jun 2020",
    institution: "Silesian University of Technology, Gliwice",
    degree: "Erasmus Exchange",
    note: null,
  },
];

const certificates = [
  {
    title: "Merit Diploma (Bachelor's Degree Finalist) — ISCTE",
    period: "March 2026",
  },
  {
    title: "Microsoft Azure Administrator Associate",
    period: "June 2021 — June 2022",
  },
  {
    title: "Microsoft Certified Azure Fundamentals, Microsoft",
    period: "December 2020",
  },
  {
    title: "Introduction to Cybersecurity, Cisco",
    period: "November 2019",
  },
];

const Index = () => {
  const cvRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    if (!cvRef.current || isDownloading) {
      return;
    }

    setIsDownloading(true);

    try {
      if ("fonts" in document) {
        await document.fonts.ready;
      }

      await new Promise((resolve) => requestAnimationFrame(resolve));

      const canvas = await html2canvas(cvRef.current, {
        scale: Math.min(2, Math.max(1.5, window.devicePixelRatio || 1)),
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
        scrollX: 0,
        scrollY: -window.scrollY,
        onclone: (clonedDoc) => {
          clonedDoc.documentElement.classList.remove("dark");
          clonedDoc.body.classList.remove("dark");
          clonedDoc.body.style.backgroundColor = "#ffffff";
          clonedDoc.body.style.color = "#111827";
          clonedDoc.body.style.cursor = "auto";

          const rootStyle = clonedDoc.documentElement.style;
          rootStyle.setProperty("--background", "0 0% 100%");
          rootStyle.setProperty("--foreground", "0 0% 3.9%");
          rootStyle.setProperty("--primary", "0 0% 9%");
          rootStyle.setProperty("--primary-foreground", "0 0% 98%");
          rootStyle.setProperty("--secondary", "0 0% 96.1%");
          rootStyle.setProperty("--secondary-foreground", "0 0% 9%");
          rootStyle.setProperty("--muted", "0 0% 96.1%");
          rootStyle.setProperty("--muted-foreground", "0 0% 45.1%");
          rootStyle.setProperty("--border", "0 0% 89.8%");

          const clonedCv = clonedDoc.getElementById("cv-content");
          if (clonedCv) {
            clonedCv.setAttribute(
              "style",
              `${clonedCv.getAttribute("style") || ""};color:#111827;background:#ffffff;`,
            );
          }
        },
      });

      const cvRect = cvRef.current.getBoundingClientRect();
      const scaleFactor = canvas.width / cvRect.width;
      const keepTogetherBlocks = Array.from(
        cvRef.current.querySelectorAll<HTMLElement>("[data-pdf-keep='true']"),
      )
        .map((element) => {
          const rect = element.getBoundingClientRect();
          const top = Math.floor((rect.top - cvRect.top) * scaleFactor);
          const bottom = Math.ceil((rect.bottom - cvRect.top) * scaleFactor);
          return { top, bottom };
        })
        .sort((a, b) => a.top - b.top);

      const forcedBreakPoints = Array.from(
        cvRef.current.querySelectorAll<HTMLElement>(
          "[data-pdf-break-before='true']",
        ),
      )
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return Math.floor((rect.top - cvRect.top) * scaleFactor);
        })
        .sort((a, b) => a - b);

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const printableWidth = pageWidth - margin * 2;
      const printableHeight = pageHeight - margin * 2;
      const pageHeightPx = Math.floor(
        (canvas.width * printableHeight) / printableWidth,
      );

      let renderedHeight = 0;
      let pageIndex = 0;

      while (renderedHeight < canvas.height) {
        const remainingHeight = canvas.height - renderedHeight;
        let currentSliceHeight = Math.min(pageHeightPx, remainingHeight);
        const proposedCut = renderedHeight + currentSliceHeight;

        if (remainingHeight > pageHeightPx && forcedBreakPoints.length > 0) {
          const forcedBreak = forcedBreakPoints.find(
            (point) => point > renderedHeight + 80 && point < proposedCut,
          );

          if (forcedBreak) {
            currentSliceHeight = Math.max(80, forcedBreak - renderedHeight);
          }
        }

        if (remainingHeight > pageHeightPx && keepTogetherBlocks.length > 0) {
          const updatedProposedCut = renderedHeight + currentSliceHeight;
          const overlappingBlock = keepTogetherBlocks.find(
            (block) =>
              updatedProposedCut > block.top &&
              updatedProposedCut < block.bottom,
          );

          if (overlappingBlock) {
            const adjustedCut = overlappingBlock.top;
            const adjustedSliceHeight = adjustedCut - renderedHeight;

            if (adjustedSliceHeight > 80) {
              currentSliceHeight = adjustedSliceHeight;
            }
          }
        }

        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = currentSliceHeight;

        const pageContext = pageCanvas.getContext("2d");
        if (!pageContext) {
          break;
        }

        pageContext.drawImage(
          canvas,
          0,
          renderedHeight,
          canvas.width,
          pageCanvas.height,
          0,
          0,
          canvas.width,
          pageCanvas.height,
        );

        const imgData = pageCanvas.toDataURL("image/jpeg", 0.98);
        const imgHeightMm =
          (pageCanvas.height * printableWidth) / pageCanvas.width;

        if (pageIndex > 0) {
          pdf.addPage();
        }

        pdf.addImage(
          imgData,
          "JPEG",
          margin,
          margin,
          printableWidth,
          imgHeightMm,
        );

        renderedHeight += pageCanvas.height;
        pageIndex += 1;
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
        className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200/70 bg-white text-slate-900 shadow-2xl shadow-black/30 print:max-w-none print:rounded-none print:border-0 print:shadow-none"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">
          <aside className="bg-slate-900 px-8 py-10 text-slate-100 print:bg-slate-900 print:text-slate-100">
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
                Full Stack Web Developer
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

            <div className="my-8 h-px bg-slate-700" />

            <section className="mb-8">
              <SectionTitle
                icon={<Code className="h-4 w-4" />}
                title="Skills"
                dark
              />
              <div className="mx-auto mt-4 flex max-w-[290px] flex-wrap justify-center gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex min-h-10 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 text-center text-sm leading-none text-cyan-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
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
            <section className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="leading-relaxed text-slate-700">
                Curious and passionate about technology, graduated in Computer
                Science and Business Management at ISCTE-IUL. Focused on full
                stack web development and applying knowledge to reach and
                fulfill clients' needs.
              </p>
            </section>

            <section className="mb-10">
              <SectionTitle
                icon={<Briefcase className="h-4 w-4" />}
                title="Experience"
              />
              <div className="mt-6 space-y-7">
                {experiences.map((exp, i) => (
                  <div
                    key={i}
                    data-pdf-keep="true"
                    data-pdf-break-before={
                      exp.period === "Apr 2019 – Oct 2020" ? "true" : undefined
                    }
                    className={`grid grid-cols-1 gap-2 sm:grid-cols-[150px_1fr] sm:gap-5 ${
                      exp.company === "Syone" ? "mb-12 print:mb-16" : ""
                    }`}
                  >
                    <div className="flex w-fit flex-col gap-1 self-start">
                      {(Array.isArray(exp.period)
                        ? exp.period
                        : [exp.period]
                      ).map((period) => (
                        <span
                          key={`${period}-${i}`}
                          className="inline-flex w-fit self-start whitespace-nowrap rounded-md bg-slate-100 px-2 py-1 text-xs font-medium uppercase tracking-wide text-slate-500"
                        >
                          {period}
                        </span>
                      ))}
                    </div>
                    <div className="border-l-2 border-slate-200 pl-4">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {exp.role}
                      </h3>
                      <p className="mb-2 text-sm font-medium text-cyan-700">
                        {exp.company}
                      </p>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {exp.description}
                      </p>
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
                    <span className="inline-flex w-fit self-start whitespace-nowrap rounded-md bg-slate-100 px-2 py-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                      {edu.period}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">
                        {edu.institution}
                      </h3>
                      <p className="text-sm font-medium text-cyan-700">
                        {edu.degree}
                      </p>
                      {edu.note && (
                        <p className="mt-1 text-sm text-slate-500">
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
                    <h3 className="mb-1 text-sm font-semibold text-slate-900">
                      {certificate.title}
                    </h3>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
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
    </div>
  );
};

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
          ? "text-sm font-semibold uppercase tracking-[0.14em] text-slate-100"
          : "text-lg font-semibold uppercase tracking-[0.14em] text-slate-900"
      }
    >
      {title}
    </h2>
    <span
      className={dark ? "h-px flex-1 bg-slate-700" : "h-px flex-1 bg-slate-200"}
    />
  </div>
);

export default Index;

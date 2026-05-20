import type { LeadRecord } from "@/types/lead";

export function generateColdMessage(lead: Pick<LeadRecord, "businessName" | "location" | "websiteStatus" | "category">) {
  const websiteAngle =
    lead.websiteStatus === "missing"
      ? "não encontrei um website próprio"
      : lead.websiteStatus === "weak"
        ? "talvez haja espaço para melhorar a presença digital e a captação de pedidos online"
        : "pode haver oportunidades simples para melhorar marcações e pedidos online";

  return `Olá, vi o ${lead.businessName} em ${lead.location} e reparei que ${websiteAngle}. Trabalho com websites, landing pages e automações simples para negócios locais, incluindo marcações, pedidos por WhatsApp, faturas e captação de leads. Pode ser que não faça sentido para vocês agora, sem problema nenhum, mas faria sentido marcarmos uma chamada rápida de 10 min para perceber se consigo acrescentar valor?`;
}

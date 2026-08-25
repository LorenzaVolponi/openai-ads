import type { Metadata } from "next";
import { LegalDocument, LegalSection } from "@/components/legal-document";

const URL = "https://openai-ads.volponi.tech/termos";

export const metadata: Metadata = {
  title: "Termos, Independência e Isenção | volponi.tech",
  description:
    "Termos editoriais, aviso de independência da OpenAI, uso de marcas e isenção de responsabilidade do guia mantido por Lorenza Volponi / volponi.tech.",
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Termos e transparência"
      title="Termos, independência e isenção"
      description="Regras de uso do conteúdo e declaração inequívoca sobre autoria, independência editorial, marcas de terceiros e limites de responsabilidade."
      updatedAt="25 de agosto de 2026"
    >
      <LegalSection title="1. Projeto editorial independente">
        <p>
          Este site é criado e mantido por Lorenza Volponi / volponi.tech. Não existe, por meio deste
          site, declaração de parceria, representação, agência, certificação, patrocínio, endosso,
          colaboração comercial ou vínculo institucional com a OpenAI.
        </p>
        <p className="font-medium text-foreground">
          Este site não é afiliado, patrocinado, endossado, certificado, operado ou mantido pela OpenAI.
        </p>
      </LegalSection>

      <LegalSection title="2. Marcas e propriedade intelectual de terceiros">
        <p>
          “OpenAI”, “ChatGPT”, “GPT” e demais nomes, logotipos, produtos, interfaces e marcas associados à
          OpenAI pertencem à OpenAI ou aos seus respectivos titulares. As referências neste guia são
          nominativas, contextuais, editoriais e informativas. O projeto utiliza sua própria identidade
          visual volponi.tech e não pretende reproduzir ou incorporar a identidade da OpenAI como identidade própria.
        </p>
        <p>
          A OpenAI publica diretrizes de marca que proíbem escolhas de design ou declarações capazes de
          sugerir endosso, patrocínio ou relação inexistente. Este projeto adota declaração expressa de
          independência justamente para reduzir esse risco de confusão.
        </p>
      </LegalSection>

      <LegalSection title="3. Capturas de tela oficiais">
        <p>
          Quando o guia exibe capturas de tela publicadas pela própria OpenAI, elas são identificadas como
          material oficial de terceiro, acompanhadas de link para a fonte e usadas para fins de explicação,
          crítica, comentário e educação sobre o funcionamento do produto. Essas imagens não são apresentadas
          como criação da volponi.tech e podem deixar de refletir a interface atual porque o Ads Manager está em evolução.
        </p>
        <p>
          A presença de uma captura oficial neste observatório não implica licença ampla sobre a interface,
          parceria, aprovação, certificação ou endosso da OpenAI. Direitos sobre os ativos de terceiros
          permanecem com seus respectivos titulares.
        </p>
      </LegalSection>

      <LegalSection title="4. Natureza do conteúdo">
        <p>
          O material é exclusivamente informativo, educacional e editorial. Não constitui aconselhamento
          jurídico, financeiro, contábil, de investimento, publicidade oficial, proposta comercial da
          OpenAI nem garantia de disponibilidade, preço, performance ou resultado de qualquer produto ou
          campanha.
        </p>
      </LegalSection>

      <LegalSection title="5. Produto em evolução">
        <p>
          Recursos, mercados, planos, formatos, interfaces, ferramentas para anunciantes e políticas podem
          mudar sem que esta página seja atualizada imediatamente. Para uma decisão operacional, prevalecem
          a documentação oficial vigente, os termos aplicáveis e as funcionalidades efetivamente disponíveis
          na conta do usuário ou anunciante.
        </p>
      </LegalSection>

      <LegalSection title="6. Fontes e correções">
        <p>
          O guia prioriza fontes primárias e oficiais, data afirmações sensíveis ao tempo e evita tratar
          rumor, estimativa ou screenshot não verificado como recurso confirmado. Erros factuais podem ser
          corrigidos a qualquer momento. A metodologia editorial e as principais fontes estão disponíveis
          na página <a className="text-primary underline" href="/metodologia">Metodologia editorial</a>.
        </p>
      </LegalSection>

      <LegalSection title="7. Limitação de responsabilidade">
        <p>
          O uso das informações é de responsabilidade do leitor. Embora sejam empregados esforços
          razoáveis de revisão, não há garantia de completude, atualização contínua, adequação a um caso
          específico ou ausência de erros. Antes de investir, anunciar, integrar sistemas ou tomar decisão
          regulatória, valide a informação em fontes oficiais e, quando necessário, consulte profissionais
          habilitados.
        </p>
      </LegalSection>

      <LegalSection title="8. Links externos">
        <p>
          Links são fornecidos para facilitar a verificação de fontes. A presença de um link não implica
          endosso recíproco, parceria ou controle sobre o conteúdo de terceiros.
        </p>
      </LegalSection>

      <LegalSection title="9. Uso do conteúdo">
        <p>
          Textos, organização editorial, identidade visual e materiais autorais próprios permanecem
          protegidos pela legislação aplicável. Citações e referências devem preservar autoria, contexto e
          indicação clara de que este é um projeto independente.
        </p>
      </LegalSection>

      <p className="rounded-xl border border-primary/25 bg-primary/5 p-5 text-sm text-muted-foreground">
        Fonte recomendada para qualquer verificação operacional sobre produtos da OpenAI:{" "}
        <a className="text-primary underline" href="https://openai.com" target="_blank" rel="noopener noreferrer">openai.com</a>.
      </p>
    </LegalDocument>
  );
}

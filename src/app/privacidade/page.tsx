import type { Metadata } from "next";
import { LegalDocument, LegalSection } from "@/components/legal-document";

const URL = "https://openai-ads.volponi.tech/privacidade";

export const metadata: Metadata = {
  title: "Privacidade e LGPD | volponi.tech",
  description:
    "Política de privacidade e transparência LGPD do guia independente sobre publicidade no ChatGPT mantido por Lorenza Volponi / volponi.tech.",
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Privacidade e LGPD"
      title="Política de Privacidade"
      description="Transparência sobre dados, infraestrutura, cookies e direitos dos titulares na versão auditada deste site."
      updatedAt="25 de agosto de 2026"
    >
      <LegalSection title="1. Quem mantém este site">
        <p>
          Este site é um projeto editorial independente de Lorenza Volponi / volponi.tech. Ele não é
          operado pela OpenAI e não representa uma política de privacidade da OpenAI. Para informações
          sobre produtos e serviços da OpenAI, consulte exclusivamente os canais oficiais da empresa.
        </p>
      </LegalSection>

      <LegalSection title="2. Dados tratados nesta versão">
        <p>
          Na revisão técnica realizada em 25 de agosto de 2026, o código do site não contém formulário
          próprio de cadastro ou contato, login de usuário, pixel publicitário, plataforma própria de
          analytics ou chamada remota do assistente “Raposa IA”. O assistente disponível na página
          processa as perguntas localmente no navegador, usando o conteúdo embarcado no próprio site.
        </p>
        <p>
          A infraestrutura de hospedagem e segurança pode, contudo, tratar dados técnicos necessários à
          entrega e proteção do serviço, como endereço IP, data e hora da requisição, user-agent, rota
          acessada e registros de segurança. Esses tratamentos podem ser executados pelo provedor de
          infraestrutura segundo seus próprios termos e políticas.
        </p>
      </LegalSection>

      <LegalSection title="3. Finalidades e bases legais">
        <p>
          Quando houver tratamento de dados pessoais sob responsabilidade deste projeto, ele deverá ser
          limitado ao necessário para disponibilizar, proteger, diagnosticar e melhorar tecnicamente o
          site, prevenir abuso e atender obrigações legais. A base legal aplicável depende da operação e
          da finalidade concreta, observando as hipóteses previstas na Lei nº 13.709/2018 (LGPD), inclusive
          legítimo interesse quando cabível e consentimento quando exigido.
        </p>
      </LegalSection>

      <LegalSection title="4. Cookies e tecnologias semelhantes">
        <p>
          Esta versão não instala intencionalmente cookies próprios de publicidade ou perfilamento. O
          provedor de hospedagem, mecanismos de proteção contra abuso ou serviços externos acessados por
          links podem utilizar cookies estritamente necessários ou outras tecnologias sob suas próprias
          políticas. Caso novas ferramentas de analytics, marketing ou personalização sejam adicionadas,
          esta política deverá ser atualizada e, quando necessário, será implementado mecanismo adequado
          de consentimento.
        </p>
      </LegalSection>

      <LegalSection title="5. Compartilhamento e transferências">
        <p>
          O projeto não vende dados pessoais. Dados técnicos de infraestrutura podem ser processados por
          fornecedores essenciais de hospedagem, rede, segurança e entrega de conteúdo. Alguns desses
          fornecedores podem operar fora do Brasil; quando houver transferência internacional de dados,
          devem ser observados os requisitos aplicáveis da LGPD e da regulamentação da ANPD.
        </p>
      </LegalSection>

      <LegalSection title="6. Retenção e segurança">
        <p>
          Dados pessoais eventualmente tratados devem ser mantidos somente pelo período necessário às
          finalidades informadas, ao cumprimento de obrigações legais e à defesa de direitos. São adotadas
          medidas técnicas razoáveis para reduzir riscos, incluindo HTTPS, cabeçalhos de segurança e
          minimização de coleta. Nenhum sistema, porém, pode prometer segurança absoluta.
        </p>
      </LegalSection>

      <LegalSection title="7. Direitos dos titulares">
        <p>
          Nos termos da LGPD, o titular pode solicitar, conforme aplicável, confirmação e acesso aos dados,
          correção, anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desacordo
          com a lei, portabilidade quando regulamentada, informação sobre compartilhamentos, revogação do
          consentimento e demais direitos previstos na legislação.
        </p>
        <p>
          Solicitações relacionadas a este projeto podem ser encaminhadas pelos canais públicos
          disponibilizados em <a className="text-primary underline" href="https://volponi.tech" target="_blank" rel="noopener noreferrer">volponi.tech</a>.
          O titular também pode consultar orientações da <a className="text-primary underline" href="https://www.gov.br/anpd/" target="_blank" rel="noopener noreferrer">Autoridade Nacional de Proteção de Dados (ANPD)</a>.
        </p>
      </LegalSection>

      <LegalSection title="8. Links externos">
        <p>
          O guia contém links para sites de terceiros, inclusive fontes oficiais. Ao sair deste domínio,
          passam a valer os termos, práticas de privacidade e controles do respectivo terceiro. Este
          projeto não controla o tratamento de dados realizado por sites externos.
        </p>
      </LegalSection>

      <LegalSection title="9. Alterações">
        <p>
          Esta política pode ser atualizada quando o código, a infraestrutura, a legislação ou as práticas
          de tratamento mudarem. A data exibida no topo identifica a versão vigente desta página.
        </p>
      </LegalSection>

      <p className="rounded-xl border border-primary/25 bg-primary/5 p-5 text-sm text-muted-foreground">
        Este texto tem finalidade informativa e de transparência e não substitui aconselhamento jurídico
        individualizado.
      </p>
    </LegalDocument>
  );
}

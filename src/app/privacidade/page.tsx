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
      description="Transparência sobre dados, infraestrutura, mensuração de audiência, cookies, descoberta em buscadores, imagens oficiais de terceiros e direitos dos titulares nesta versão do site."
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
          próprio de cadastro ou contato, login de usuário, pixel publicitário, ferramenta de remarketing
          ou chamada remota do assistente “Raposa IA”. O assistente e o módulo Volponi Ad Quality Review
          processam o conteúdo localmente no navegador, usando regras e conteúdo embarcados no próprio site.
        </p>
        <p>
          O site utiliza Vercel Web Analytics para mensuração agregada de audiência, incluindo page views,
          páginas/rotas acessadas, origem de referência e dimensões técnicas agregadas como país aproximado,
          navegador, sistema operacional e tipo de dispositivo. Segundo a documentação da Vercel, o Web
          Analytics foi desenhado para operar sem cookies de terceiros e sem associar os dados analíticos a
          uma pessoa identificável ou a um endereço IP individual. Não são configurados neste projeto eventos
          personalizados com e-mail, nome, telefone, conteúdo digitado na Raposa IA ou texto submetido ao
          Volponi Ad Quality Review.
        </p>
        <p>
          Separadamente da camada de analytics, a infraestrutura de hospedagem e segurança pode tratar dados
          técnicos necessários à entrega e proteção do serviço, como endereço IP, data e hora da requisição,
          user-agent, rota acessada e registros de segurança. Esses tratamentos podem ser executados pelo
          provedor de infraestrutura segundo seus próprios termos e políticas.
        </p>
      </LegalSection>

      <LegalSection title="3. Finalidades e bases legais">
        <p>
          Quando houver tratamento de dados pessoais sob responsabilidade deste projeto, ele deverá ser
          limitado ao necessário para disponibilizar, proteger, diagnosticar, mensurar audiência de forma
          agregada e melhorar tecnicamente o site, prevenir abuso e atender obrigações legais. A base legal
          aplicável depende da operação e da finalidade concreta, observando as hipóteses previstas na Lei
          nº 13.709/2018 (LGPD), inclusive legítimo interesse quando cabível e consentimento quando exigido.
        </p>
      </LegalSection>

      <LegalSection title="4. Cookies e tecnologias semelhantes">
        <p>
          Esta versão não instala intencionalmente cookies próprios de publicidade, remarketing ou
          perfilamento comportamental. O Vercel Web Analytics utilizado pelo projeto é descrito pela Vercel
          como uma solução de analytics sem cookies de terceiros, baseada em dados agregados para medir
          audiência. O provedor de hospedagem, mecanismos de proteção contra abuso ou serviços externos
          acessados por links podem utilizar tecnologias estritamente necessárias sob suas próprias políticas.
        </p>
        <p>
          Caso sejam adicionadas no futuro ferramentas de marketing, personalização, sessão gravada ou
          mensuração que alterem materialmente o tratamento aqui descrito, esta política deverá ser atualizada
          e, quando necessário, será implementado mecanismo adequado de consentimento ou oposição.
        </p>
      </LegalSection>

      <LegalSection title="5. Capturas oficiais e entrega de imagens">
        <p>
          Algumas seções educacionais exibem capturas de tela oficiais publicadas pela OpenAI para explicar
          visualmente como anúncios e o Ads Manager funcionam. Essas imagens não são geradas nem alteradas
          pela volponi.tech e são identificadas como material oficial de terceiros com link para a fonte.
        </p>
        <p>
          A aplicação pode usar a camada de otimização de imagens do próprio framework/hospedagem para
          entregar essas capturas em formato e tamanho adequados ao dispositivo. Nesse fluxo, a infraestrutura
          do site pode recuperar o arquivo original no CDN usado pelas páginas oficiais da OpenAI e então
          entregar ao navegador uma versão otimizada pelo próprio domínio. O projeto não usa essa operação
          para perfilamento, remarketing ou venda de dados. Ao abrir a fonte oficial por link, passam a valer
          as práticas de privacidade do respectivo terceiro.
        </p>
      </LegalSection>

      <LegalSection title="6. Descoberta em buscadores, Preferred Sources e IndexNow">
        <p>
          O site publica sitemap, RSS e arquivos estruturados para facilitar descoberta e citação por
          mecanismos de busca e sistemas de IA. Também disponibiliza um link para a ferramenta oficial de
          “Preferred Sources” do Google. Esse recurso é implementado como link externo: o script do Google
          não é carregado automaticamente por este domínio e a navegação para a ferramenta ocorre somente
          quando a pessoa decide clicar.
        </p>
        <p>
          Após uma publicação de produção validada, o pipeline pode notificar o protocolo IndexNow sobre
          URLs públicas que foram publicadas ou atualizadas. Esse envio ocorre entre servidores e contém
          apenas o host, a chave pública de verificação e URLs públicas do próprio site; ele não envia
          histórico de navegação, perguntas à Raposa IA ou identificadores de visitantes.
        </p>
      </LegalSection>

      <LegalSection title="7. Compartilhamento e transferências">
        <p>
          O projeto não vende dados pessoais. Dados técnicos de infraestrutura, entrega de conteúdo e
          mensuração agregada de audiência podem ser processados pela Vercel e por fornecedores essenciais
          de hospedagem, rede, segurança e CDN. Alguns desses fornecedores podem operar fora do Brasil;
          quando houver transferência internacional de dados, devem ser observados os requisitos aplicáveis
          da LGPD e da regulamentação da ANPD.
        </p>
      </LegalSection>

      <LegalSection title="8. Retenção e segurança">
        <p>
          Dados pessoais eventualmente tratados devem ser mantidos somente pelo período necessário às
          finalidades informadas, ao cumprimento de obrigações legais e à defesa de direitos. São adotadas
          medidas técnicas razoáveis para reduzir riscos, incluindo HTTPS, cabeçalhos de segurança e
          minimização de coleta. Nenhum sistema, porém, pode prometer segurança absoluta.
        </p>
      </LegalSection>

      <LegalSection title="9. Direitos dos titulares">
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

      <LegalSection title="10. Links externos">
        <p>
          O guia contém links para sites de terceiros, inclusive fontes oficiais e ferramentas de busca.
          Ao sair deste domínio, passam a valer os termos, práticas de privacidade e controles do respectivo
          terceiro. Este projeto não controla o tratamento de dados realizado por sites externos.
        </p>
      </LegalSection>

      <LegalSection title="11. Alterações">
        <p>
          Esta política pode ser atualizada quando o código, a infraestrutura, a legislação ou as práticas
          de tratamento mudarem. A data exibida no topo identifica a versão vigente desta página.
        </p>
      </LegalSection>

      <p className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-sm text-muted-foreground">
        Este texto tem finalidade informativa e de transparência e não substitui aconselhamento jurídico
        individualizado.
      </p>
    </LegalDocument>
  );
}

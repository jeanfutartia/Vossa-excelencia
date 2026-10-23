// ================= HISTÓRIAS =================
// E(id, quem, título, texto, escolhas, opções). Escolha: l, fx, r, p (chance), fail{fx,r}, set, unset, end, fn
function E(id,who,t,txt,ch,o){return {id,who,t,txt,ch,o:o||{}}}
const EVENTS=[
// ---------- GERAIS ----------
E('enchente','*','A enchente','Choveu 120 mm em seis horas e o bairro mais baixo de {cidade} ficou debaixo d’água. Famílias perderam tudo.',[
 {l:'Ir ao local de botas e ajudar no resgate',fx:{apo:4,am:2,$:-2},r:'As fotos de você com água na cintura rodaram o estado.'},
 {l:'Publicar nota de solidariedade',fx:{am:1,apo:-1},r:'A nota passou despercebida. Teve quem reclamasse da sua ausência.'},
 {l:'Culpar os adversários pela falta de drenagem',fx:{am:2,ip:-3,et:-1},r:'O ataque repercutiu, mas os colegas acharam oportunismo.'}]),
E('audio','*','Áudio vazado','Um primo encaminhou para o grupo da família um áudio seu dizendo que “eleitor só lembra de político na eleição”. O áudio saiu do grupo.',[
 {l:'Pedir desculpas publicamente',fx:{ap:-1,et:2},r:'O pedido de desculpas encerrou o assunto em dois dias.'},
 {l:'Dizer que é montagem feita com IA',p:.55,fx:{},r:'Ninguém conseguiu provar o contrário.',fail:{fx:{et:-6,ap:-4},r:'A perícia confirmou que o áudio é verdadeiro. Agora você mentiu duas vezes.'}},
 {l:'Ignorar e esperar passar',fx:{am:-3},r:'O áudio virou figurinha e acompanhou você por meses.'}]),
E('empresario','*','O empresário generoso','Seu Arlindo, dono da maior distribuidora da região, oferece pagar o aluguel do seu escritório político “sem compromisso”.',[
 {l:'Aceitar, com contrato e declaração',fx:{$:8},r:'Tudo registrado. Ele parece decepcionado com tanta formalidade.'},
 {l:'Aceitar “por fora”',fx:{$:25,et:-5,rj:6},set:'arlindo',ally:{t:'empresario',name:'Seu Arlindo Prates',gen:'m',shady:true,pow:2},r:'O dinheiro chega em espécie, numa sacola de supermercado.'},
 {l:'Recusar educadamente',fx:{et:2,aa:-1},r:'Seu Arlindo diz que entende. E passa a financiar {rival}.'}],{once:true}),
E('arlindo_cobra','*','A conta do Seu Arlindo','Seu Arlindo voltou. Agora quer que você ajude a empresa do genro a vencer um contrato público.',[
 {l:'Fazer o meio de campo',fx:{$:15,rj:10,et:-6},set:'arlindo2',r:'O genro venceu. Seu nome aparece em três trocas de mensagem.'},
 {l:'Recusar e encerrar a relação',p:.6,fx:{et:2},r:'Ele ficou furioso, mas não abriu a boca.',fail:{fx:{rj:8,am:-4},r:'Furioso, ele contou a um jornalista sobre a sacola de dinheiro.'}},
 {l:'Procurar o Ministério Público e contar tudo',fx:{et:6,rj:-4,cp:-4,pt:-3},r:'Você virou testemunha. A cúpula do partido acha que você fala demais.'}],{req:()=>F('arlindo'),w:4,once:true}),
E('op_sacola','*','Operação Sacola','A Polícia Federal cumpre mandados na distribuidora de Seu Arlindo. Seu nome está nas planilhas.',[
 {l:'Dar entrevista negando tudo',fx:{rj:6,am:-3},r:'As planilhas falaram mais alto que a entrevista.'},
 {l:'Contratar a melhor banca de advogados',fx:{rj:-4,$:-25},r:'Os advogados conseguiram tirar seu nome da primeira denúncia.'},
 {l:'Colaborar com as investigações',fx:{rj:-8,cp:-6,pt:-5,et:2},r:'Você escapou da denúncia, mas perdeu amigos no caminho.'}],{req:()=>F('arlindo2'),w:5,once:true}),
E('fakenews','*','Corrente de mentiras','Uma corrente de WhatsApp diz que você vai fechar todas as igrejas da cidade. Já chegou a milhares de grupos.',[
 {l:'Processar os autores',fx:{$:-5,aa:1,rj:-1},r:'A Justiça mandou remover. A corrente já tinha feito estrago.'},
 {l:'Gravar vídeo com pastores desmentindo',fx:{apo:2,am:2},r:'O vídeo circulou nos mesmos grupos. Funcionou.'},
 {l:'Ignorar',fx:{apo:-3,am:-1},r:'Na feira, uma senhora perguntou se era verdade.'}]),
E('sonho','*','Seu nome na pesquisa','Um instituto incluiu seu nome numa pesquisa para um cargo maior. Você aparece com 6%.',[
 {l:'Comemorar publicamente',fx:{cp:3,pt:-3},r:'A militância vibrou. O cacique do partido não gostou de ser atropelado.'},
 {l:'Dizer que “não é hora de falar nisso”',fx:{cp:1,pt:3},r:'A modéstia agradou a cúpula.'}]),
E('emprego','*','O afilhado do padrinho','O deputado que apadrinhou sua filiação pede um emprego para o afilhado, que não tem qualificação nenhuma.',[
 {l:'Arrumar uma vaga',fx:{pt:4,et:-3},r:'O afilhado aparece só para bater ponto.'},
 {l:'Recusar com jeito',fx:{pt:-4,et:2},r:'O padrinho disse que vai lembrar disso.'},
 {l:'Indicar para um curso de qualificação',fx:{pt:-1,et:1,am:1},r:'O afilhado nunca apareceu no curso.'}]),
E('greve_prof','*','Greve dos professores','Professores da rede pública cruzaram os braços por reajuste. As escolas estão fechadas há duas semanas.',[
 {l:'Apoiar a greve no carro de som',fx:{am:3,apo:1,aa:-2},r:'Você foi aplaudido(a) na assembleia da categoria.'},
 {l:'Propor mediação',fx:{ip:2,cp:2},r:'Sua proposta virou a base do acordo.'},
 {l:'Criticar a greve e defender as crianças',fx:{aa:2,am:-3},r:'Pais aplaudiram. Professores nunca mais esqueceram.'}]),
E('motorista','*','O motorista','Seu motorista foi parado numa blitz, embriagado, dirigindo o carro que você usa no trabalho.',[
 {l:'Demitir e pedir desculpas',fx:{et:2,am:1},r:'Resposta rápida. A história morreu no dia seguinte.'},
 {l:'Defender o funcionário',fx:{et:-4,am:-3},r:'A imprensa perguntou se você também defende motorista bêbado.'},
 {l:'Tentar abafar com o delegado',p:.5,fx:{rj:2},r:'O boletim sumiu.',fail:{fx:{rj:6,et:-5,am:-3},r:'O delegado gravou a conversa.'}}]),
E('reality','*','Convite para reality show','Uma emissora quer você num reality de famosos. Seriam três meses confinado(a).',[
 {l:'Aceitar',fx:{am:5,apo:4,aa:-4,cp:-4,pt:-2},r:'Você ficou famoso(a). Ninguém em {cidade} leva você muito a sério agora.'},
 {l:'Recusar',fx:{cp:1},r:'Seu assessor de imprensa ficou triste.'}],{once:true}),
E('morte_lider','*','Morre o velho líder','Morreu o fundador do {partido} no estado, aos 91 anos. O velório vira um encontro de toda a política.',[
 {l:'Discursar no velório',fx:{pt:4,cp:2},r:'Seu discurso foi o mais citado nos jornais.'},
 {l:'Articular para herdar o grupo político dele',fx:{cp:5,pt:-4,ip:2},r:'Antes do enterro você já tinha fechado com dois herdeiros.'}],{once:true}),
E('hacker','*','Celular invadido','Hackers invadiram seu celular e ameaçam divulgar suas conversas.',[
 {l:'Entregar o caso à Polícia Federal',fx:{et:2},p:s=>s.et/100,r:'As conversas vazaram e não havia nada de grave nelas.',fail:{fx:{rj:6,am:-4},r:'As conversas vazaram e algumas eram constrangedoras.'}},
 {l:'Negociar com os hackers',fx:{$:-15,rj:3},r:'Você pagou. Eles prometeram apagar tudo.'}]),
E('reporter','*','O repórter investigativo','Um repórter do maior jornal do estado pede explicações sobre o crescimento do seu patrimônio.',[
 {l:'Abrir todas as contas',p:s=>s.et/100,fx:{et:3,aa:2,rj:-2},r:'A reportagem saiu e não encontrou nada.',fail:{fx:{rj:6,aa:-3},r:'O repórter encontrou um apartamento que você esqueceu de declarar.'}},
 {l:'Não dar entrevista',fx:{aa:-2,am:-1},r:'A matéria saiu com “procurado(a), não respondeu”.'},
 {l:'Ameaçar processar',fx:{aa:-3,et:-2},r:'O jornal publicou a ameaça na primeira página.'}]),
E('pulpito','*','Convite para o púlpito','O pastor da maior igreja de {cidade} convida você para falar no culto de domingo.',[
 {l:'Aceitar e pedir oração pelo seu mandato',fx:{apo:3,aa:-1},r:'Quatro mil fiéis estenderam as mãos na sua direção.'},
 {l:'Recusar em nome do Estado laico',fx:{aa:2,apo:-2},r:'O pastor disse que entende. Os fiéis, nem tanto.'}]),
E('torcida','*','A torcida organizada','A torcida organizada do time da cidade oferece apoio em troca de ingressos e ônibus para os jogos fora de casa.',[
 {l:'Aceitar',fx:{apo:3,rj:3,et:-2,$:-4},r:'Seu nome foi cantado na arquibancada.'},
 {l:'Recusar',fx:{et:1},r:'Pixaram seu nome no muro do estádio.'}]),
E('meme','*','Você virou meme','Você tropeçou ao subir no palanque e o vídeo virou meme nacional.',[
 {l:'Abraçar o meme e rir de si',fx:{am:4,apo:2},r:'Seus seguidores triplicaram.'},
 {l:'Pedir a remoção dos vídeos',fx:{am:-3},r:'Efeito Streisand: o meme ficou ainda maior.'}]),
E('foto_suspeita','*','A foto com o grileiro','Um apoiador que posou ao seu lado na última festa foi preso por grilagem de terras.',[
 {l:'Soltar nota de repúdio',fx:{et:1,am:1},r:'A nota resolveu.'},
 {l:'Ficar em silêncio',fx:{rj:2,am:-2},r:'A foto voltou a circular toda semana.'},
 {l:'Defender o apoiador',fx:{apo:1,rj:5,et:-5},r:'O inquérito agora tem uma pasta com seu nome.'}]),
E('forum','*','Fórum em Lisboa','Você foi convidado(a) para um fórum jurídico em Lisboa, com passagens pagas por uma empresa com interesses no governo.',[
 {l:'Ir',fx:{cp:3,aa:1,am:-3,rj:2},r:'As fotos no jantar com ministros e empresários renderam críticas.'},
 {l:'Ir, pagando do próprio bolso',fx:{cp:2,$:-8},r:'Ninguém pôde reclamar.'},
 {l:'Não ir',fx:{et:1},r:'Você ficou em casa assistindo à transmissão.'}]),
E('burnout','*','O corpo cobra','Três meses sem folga. Você desmaiou no gabinete e o médico mandou parar.',[
 {l:'Tirar licença de um trimestre',fx:{ap:1,cp:-2},r:'Você descansou e voltou com energia, mas perdeu votações importantes.'},
 {l:'Ignorar o médico',p:.6,fx:{cp:1},r:'Você aguentou firme.',fail:{fx:{cp:-4,ap:-2},r:'Você foi internado(a) às pressas e perdeu votações importantes.'}}],{once:true}),
E('irmao','*','O irmão candidato','Seu irmão quer se candidatar usando seu sobrenome como marca.',[
 {l:'Apoiar a candidatura',fx:{pt:2,cp:2,et:-1},r:'Agora a família tem um grupo político.'},
 {l:'Desaconselhar',fx:{et:1},r:'O almoço de domingo ficou tenso.'}],{once:true}),
E('delegado','*','O delegado amigo','Um delegado que gosta de você oferece informações sigilosas de inquéritos contra seus adversários.',[
 {l:'Aceitar',fx:{cp:3,rj:5,et:-4},set:'delegado',r:'Você ficou sabendo de tudo antes de todo mundo.'},
 {l:'Recusar',fx:{et:2},r:'O delegado nunca mais ligou.'}],{once:true}),
E('ocupacao','*','A ocupação','Um movimento de moradia ocupou um prédio abandonado no centro. A Justiça mandou desocupar.',[
 {l:'Apoiar as famílias',fx:{apo:3,aa:-3,am:-1},r:'Você passou a noite no prédio com as famílias.'},
 {l:'Defender a reintegração de posse',fx:{aa:3,am:1,apo:-3},r:'A desocupação aconteceu com tensão.'},
 {l:'Mediar uma saída negociada',fx:{ip:2,cp:2,et:1},r:'As famílias foram para um aluguel social.'}]),
E('escandalo_partido','*','O cacique foi preso','O presidente estadual do {partido} foi preso por desvio de verbas da saúde.',[
 {l:'Se afastar publicamente',fx:{et:2,am:2,pt:-5},r:'Você foi o(a) primeiro(a) a condenar. A cúpula anotou.'},
 {l:'Defender o cacique',fx:{pt:5,et:-4,rj:2,am:-3},r:'O partido agradece. A imprensa, não.'},
 {l:'Disputar o comando vago',fx:{cp:5,pt:-2},r:'Você agora é um nome na disputa interna.'}],{once:true}),
E('podcast_ext','*','O podcast extremista','Um podcaster famoso por teorias da conspiração convida você para uma entrevista. A audiência é de milhões.',[
 {l:'Ir e concordar com tudo',fx:{am:4,apo:2,aa:-4,et:-3},r:'Você ganhou milhares de seguidores radicais.'},
 {l:'Ir e contestar ao vivo',p:.5,fx:{aa:3,am:2},r:'Seu confronto viralizou a seu favor.',fail:{fx:{am:-3},r:'Você foi editado(a) para parecer ridículo(a).'}},
 {l:'Recusar',fx:{},r:'Nada aconteceu.'}]),
E('bets','*','A casa de apostas','Uma casa de apostas on-line quer patrocinar suas lives e eventos. O cachê é generoso.',[
 {l:'Aceitar o patrocínio',fx:{$:20,am:-3,et:-2},r:'A publicidade apareceu em todos os seus vídeos.'},
 {l:'Recusar e denunciar o vício em apostas',fx:{am:3,et:2,apo:1},r:'Mães de jovens endividados agradeceram.'}],{once:true}),
E('celebridade','*','O fenômeno de votos','Uma ex-jogadora de vôlei famosa quer se filiar ao {partido} e disputar a próxima eleição proporcional.',[
 {l:'Abrir as portas e fazer a ficha',fx:{pt:4,cp:2},ally:{t:'influencer',gen:'f',shady:false,pow:2},set:'puxador',r:'Com uma puxadora de votos, o corte da legenda fica mais baixo.'},
 {l:'Desconfiar do oportunismo',fx:{et:1,pt:-2},r:'Ela se filiou em outro partido.'}],{once:true}),
E('coronel','*','O chefe político do interior','Um chefe político que controla votos em doze cidades oferece apoio em troca da indicação do filho para um cargo.',[
 {l:'Fechar o acordo',fx:{apo:3,ip:3,cp:2,et:-4},ally:{t:'prefeito',gen:'m',shady:true,pow:2},r:'Os votos do sertão agora são seus.'},
 {l:'Recusar',fx:{et:2,apo:-1},r:'Ele foi apoiar {rival}.'}]),
E('assessor_rival','*','O assessor traidor','Seu chefe de gabinete pediu demissão e vai concorrer contra você, levando a lista de contatos.',[
 {l:'Desejar boa sorte',fx:{et:1,cp:-1},r:'Elegância rende pouco voto.'},
 {l:'Espalhar que ele foi demitido por incompetência',fx:{et:-2,cp:1},r:'A briga virou novela.'}],{once:true}),
E('apagao','*','O apagão','Um apagão deixou a região sem luz por 30 horas.',[
 {l:'Cobrar a concessionária na Justiça',fx:{am:2,aa:1,$:-2},r:'A empresa foi multada.'},
 {l:'Distribuir velas e água nos bairros',fx:{apo:3,$:-3},r:'Você estava lá quando ninguém estava.'}]),
E('op_colega','*','Operação no gabinete vizinho','A Polícia Federal cumpre mandado de busca no gabinete de um colega de partido. Ele era seu aliado mais próximo.',[
 {l:'Se solidarizar com ele',fx:{pt:2,rj:3,am:-2},r:'Ele ficou grato. Os investigadores também anotaram.'},
 {l:'Cortar relações',fx:{et:1,ip:-2},r:'Seus aliados acham que você abandona amigos.'}]),
E('premio','*','Prêmio de transparência','Uma ONG de controle social escolheu você como destaque em transparência.',[
 {l:'Receber o prêmio em evento público',fx:{aa:3,am:2,et:2},r:'A foto com o troféu saiu nos jornais.'},
 {l:'Agradecer discretamente',fx:{et:1},r:'Uma nota no seu perfil.'}],{req:s=>s.et>=70,once:true}),
E('familiar_doente','*','Uma doença na família','Sua mãe foi internada em um hospital público e esperou 9 horas por atendimento.',[
 {l:'Transformar a experiência em projeto de lei',fx:{apo:3,am:2,et:1},r:'A história comoveu e seu projeto ganhou apoio.'},
 {l:'Transferir para um hospital particular e manter discrição',fx:{$:-8},r:'Ela se recuperou bem.'}],{once:true}),
E('deepfake','*','O vídeo falso','Um vídeo feito com IA mostra você recebendo dinheiro. É falso, mas parece real.',[
 {l:'Pedir perícia e acionar a Justiça',fx:{$:-6,rj:-1},p:.7,r:'A perícia provou a montagem.',fail:{fx:{am:-4,apo:-2},r:'Até a perícia sair, metade da cidade acreditou.'}},
 {l:'Fazer live mostrando os erros do vídeo',fx:{am:2},r:'O desmentido viralizou.'}]),
E('jogo_bicho','*','O bicheiro mecenas','O patrono da escola de samba oferece homenagear você no desfile. Todos sabem de onde vem o dinheiro dele.',[
 {l:'Desfilar no carro alegórico',fx:{apo:4,et:-3,rj:3},r:'Você foi aplaudido(a) por cem mil pessoas.'},
 {l:'Recusar a homenagem',fx:{et:1},r:'A escola escolheu {rival}.'}]),
E('queimada','*','Fumaça no céu','Queimadas no entorno cobriram a cidade de fumaça. Hospitais estão cheios de crianças com crise respiratória.',[
 {l:'Cobrar fiscalização ambiental',fx:{aa:2,am:2,apo:-1},r:'Fazendeiros não gostaram.'},
 {l:'Culpar “ONGs internacionais”',fx:{apo:1,aa:-3,et:-2},r:'Ninguém acreditou nas provas que você não tinha.'}]),
// ---------- CONSEQUÊNCIAS ----------
E('lobista_cobra','*','O lobista volta','O lobista do almoço quer seu voto contra a regulação do setor dele. Ele lembra que pagou várias contas.',[
 {l:'Votar como ele quer',fx:{$:15,rj:6,et:-4},r:'O envelope desta vez era mais gordo.'},
 {l:'Votar contra o setor',p:.6,fx:{et:3},r:'Ele sumiu.',fail:{fx:{rj:7,am:-3},r:'Ele vazou os recibos dos almoços.'}}],{req:()=>F('lobista'),w:4,once:true}),
E('tse_contas','*','Contas de campanha rejeitadas','O Tribunal Regional Eleitoral rejeitou sua prestação de contas: há despesas sem origem declarada.',[
 {l:'Recorrer com nova documentação',fx:{$:-10,rj:-3},p:.5,r:'O recurso foi aceito.',fail:{fx:{rj:6},r:'O recurso foi negado e o Ministério Público abriu ação.'}},
 {l:'Culpar o tesoureiro',fx:{et:-2,rj:2,pt:-2},r:'O tesoureiro foi expulso. Ele guarda mágoa e documentos.'}],{req:()=>F('caixa2'),w:4,once:true}),
E('rachadinha_ex','*','A ex-assessora fala','Uma ex-assessora deu entrevista contando que devolvia metade do salário para você.',[
 {l:'Negar tudo',fx:{rj:6,am:-4},r:'Ela tinha os comprovantes de depósito.'},
 {l:'Acordo para devolver o dinheiro',fx:{rj:-4,$:-20,am:-2},r:'O caso foi para um acordo de não persecução.'}],{req:()=>F('rachadinha'),w:5,once:true}),
E('nepotismo_ex','*','Nepotismo na manchete','O jornal descobriu seu cunhado no gabinete. A Súmula Vinculante 13 é clara.',[
 {l:'Exonerar imediatamente',fx:{et:2,am:-1,pt:-1},r:'O caso morreu rápido.'},
 {l:'Dizer que ele é o mais qualificado',fx:{et:-3,rj:4,am:-3},r:'O Ministério Público pediu a exoneração na Justiça.'}],{req:()=>F('parente'),w:4,once:true}),
E('pix_tcu','*','Auditoria nas emendas Pix','O Tribunal de Contas cruzou suas emendas Pix com obras que nunca saíram do papel.',[
 {l:'Exigir devolução da prefeitura aliada',fx:{et:2,ip:-3,rj:-2},r:'O prefeito aliado ficou furioso.'},
 {l:'Dizer que a responsabilidade é do prefeito',fx:{rj:3,ip:-1},r:'O TCU discordou parcialmente.'}],{req:()=>F('emendaPix'),w:4,once:true}),
E('licitacao_pf','*','Operação Concorrência','A Polícia Federal deflagrou a Operação Concorrência sobre a licitação direcionada no seu governo.',[
 {l:'Exonerar o secretário envolvido',fx:{rj:-3,ip:-3,et:1},r:'O secretário caiu. Ele ainda pode falar.'},
 {l:'Dizer que é perseguição política',fx:{rj:5,apo:1,aa:-4},r:'Sua base acreditou. Os procuradores, não.'}],{req:()=>F('licitacao'),w:5,once:true}),
E('emprestimo_parcela','exec','A parcela vence','A primeira parcela do empréstimo internacional venceu com o dólar em alta.',[
 {l:'Pagar e cortar investimentos',fx:{f:-6,apo:-2},r:'As obras pararam.'},
 {l:'Rolar a dívida com juros maiores',fx:{f:-2,aa:-2},set:'emprestimo2',r:'Problema empurrado para frente.'}],{req:()=>F('emprestimo'),w:4,once:true}),
E('vazou_volta','*','O dossiê tem dono','{rival} descobriu que foi você quem vazou o dossiê e contou tudo numa entrevista.',[
 {l:'Negar',fx:{et:-2,am:-2},r:'A palavra dele contra a sua.'},
 {l:'Admitir e dizer que era interesse público',fx:{et:1,ip:-3},r:'Alguns entenderam.'}],{req:()=>F('vazou'),w:3,once:true}),
E('aije','*','Ação por compra de votos','O Ministério Público Eleitoral entrou com AIJE: fotos das cestas básicas e depoimentos de eleitores.',[
 {l:'Contratar especialistas em direito eleitoral',fx:{$:-30},p:.45,r:'O tribunal achou as provas insuficientes.',fail:{fx:{},r:'O tribunal cassou seu diploma e declarou você inelegível por 8 anos.',end:'inelegivel'}},
 {l:'Ameaçar as testemunhas',p:.3,fx:{rj:10,et:-6},r:'As testemunhas mudaram o depoimento.',fail:{fx:{rj:20},r:'A ameaça foi gravada. Diploma cassado e inquérito por coação.',end:'inelegivel'}}],{req:()=>F('compraVotos')&&S.office!=='none',w:6,once:true}),
E('delegado_cai','*','O delegado foi pego','O delegado que passava informações para você foi preso. O celular dele tem suas mensagens.',[
 {l:'Contratar advogados e ficar quieto(a)',fx:{rj:5,$:-15},r:'Por enquanto, silêncio.'},
 {l:'Se antecipar e explicar à imprensa',fx:{rj:2,et:1,am:-2},r:'A versão foi sua antes de ser dos outros.'}],{req:()=>F('delegado'),w:3,once:true}),
// ---------- SEM MANDATO ----------
E('sem_salario','none','Sem mandato, sem salário','Sem cargo, as contas chegam do mesmo jeito. Aliados sugerem caminhos.',[
 {l:'Abrir uma consultoria',fx:{$:15,cp:-1},r:'Empresas querem saber como Brasília funciona.'},
 {l:'Voltar à profissão',fx:{$:8,et:1,cp:-2},r:'Rotina comum, consciência leve.'},
 {l:'Aceitar cargo com um aliado',fx:{$:10,pt:3,ip:1},r:'Assessoria especial, salário razoável.'}]),
E('convite_sec','none','Convite para secretaria','O prefeito aliado oferece a Secretaria de Assistência Social.',[
 {l:'Aceitar',fx:{cp:4,apo:3,ip:2,$:6},r:'Você ganhou vitrine para a próxima eleição.'},
 {l:'Recusar e focar na campanha',fx:{pt:-1},r:'Você manteve independência.'}]),
E('comentarista','none','Comentarista de TV','Uma emissora regional quer você como comentarista político no telejornal da noite.',[
 {l:'Aceitar',fx:{am:3,aa:2,$:5},r:'Seu rosto entra na casa das pessoas todas as noites.'},
 {l:'Recusar',fx:{},r:'Outro ex-político ficou com a vaga.'}]),
E('ong','none','Fundar uma ONG','Você pode fundar uma ONG para manter trabalho social nos bairros.',[
 {l:'Fundar com recursos próprios',fx:{apo:3,et:2,$:-10},r:'O trabalho social mantém seu nome vivo.'},
 {l:'Fundar com convênio público',fx:{apo:3,rj:3,$:5},r:'O convênio sempre chama a atenção de auditores.'}]),
E('desistir','none','A oferta para desistir','{rival} oferece um bom dinheiro para você não disputar a próxima eleição.',[
 {l:'Aceitar',fx:{$:30,et:-5,cp:-5,rj:3},r:'Você embolsou e sumiu dos holofotes.'},
 {l:'Recusar e denunciar',fx:{et:3,am:2,ip:-1},r:'A denúncia deu manchete.'}],{once:true}),
// ---------- VEREADOR ----------
E('cpi_limpeza','ver','CPI da Limpeza Pública','Surge pedido de CPI contra o consórcio do lixo. Um dos sócios é ligado ao presidente do seu partido.',[
 {l:'Apoiar a CPI',fx:{et:5,aa:3,am:3,ip:-6,pt:-6},r:'Você virou referência de independência. Suas emendas de bairro foram bloqueadas.'},
 {l:'Rejeitar a CPI',fx:{cp:5,ip:5,pt:4,am:-5,aa:-3},set:'ccj',r:'Como prêmio, você ganhou a presidência da Comissão de Constituição e Justiça.'}],{once:true}),
E('ccj_pauta','ver','A pauta-bomba da CCJ','Como presidente da CCJ, o prefeito pede que você engavete o projeto de transparência dos contratos.',[
 {l:'Engavetar',fx:{ip:4,pt:2,et:-3},r:'O projeto morreu na gaveta.'},
 {l:'Pautar e aprovar',fx:{et:4,aa:2,ip:-5},r:'O prefeito disse que você é ingrato(a).'}],{req:()=>F('ccj'),w:4,once:true}),
E('salario_ver','ver','Reajuste dos vereadores','A Câmara vota reajuste de 40% nos salários dos vereadores para a próxima legislatura.',[
 {l:'Votar a favor',fx:{$:10,ip:3,am:-4,apo:-2},r:'Aprovado. O povo lotou a galeria para vaiar.'},
 {l:'Votar contra',fx:{am:3,apo:2,ip:-3},r:'Você foi aplaudido(a) na galeria e ignorado(a) no café.'},
 {l:'Sair do plenário na hora',fx:{ip:-1,am:-1},r:'A ausência foi notada pelos dois lados.'}]),
E('rua','ver','Nome de rua','O prefeito quer dar a uma avenida o nome do pai dele, um ex-prefeito acusado de corrupção.',[
 {l:'Votar a favor',fx:{ip:3,am:-2},r:'O prefeito ficou emocionado.'},
 {l:'Propor o nome de uma professora do bairro',fx:{apo:2,et:1,ip:-2},r:'A professora ganhou a avenida.'}]),
E('onibus','ver','A linha cortada','A empresa de ônibus cortou a única linha que atende três bairros da periferia.',[
 {l:'Fazer protesto no ponto final',fx:{apo:4,am:1},r:'A linha voltou em uma semana.'},
 {l:'Negociar com o prefeito',fx:{ip:2,apo:1},r:'A linha voltou com metade dos horários.'}]),
E('irmao_sec','ver','Uma secretaria para a família','O prefeito oferece uma secretaria ao seu irmão em troca de seu voto fiel no orçamento.',[
 {l:'Aceitar',fx:{ip:5,et:-4,rj:2},r:'Seu irmão virou secretário. Você virou base do governo.'},
 {l:'Recusar',fx:{et:2,ip:-2},r:'O prefeito procurou outro vereador.'}],{once:true}),
E('plano_diretor','ver','O Plano Diretor','Uma construtora quer mudar o zoneamento de uma área verde e oferece “ajudar na sua próxima campanha”.',[
 {l:'Votar pela mudança',fx:{$:20,rj:6,et:-5,aa:1},r:'A área verde virou canteiro de obras.'},
 {l:'Defender a área verde',fx:{et:3,am:3,aa:-1},r:'Moradores fizeram um abraço simbólico no parque.'}]),
E('madrugada','ver','Sessão até a madrugada','A votação do orçamento entrou na madrugada e a oposição quer obstruir.',[
 {l:'Ajudar a obstruir',fx:{cp:2,ip:-3,pt:1},r:'O orçamento ficou para a semana seguinte.'},
 {l:'Garantir o quórum',fx:{ip:3,am:-1},r:'Orçamento aprovado às 4h da manhã.'}]),
E('castracao','ver','A causa animal','Protetores de animais lotam a Câmara pedindo castração gratuita.',[
 {l:'Apresentar o projeto',fx:{am:3,apo:1},r:'Os protetores viraram sua militância mais fiel.'},
 {l:'Dizer que há prioridades maiores',fx:{am:-2},r:'Você recebeu centenas de comentários com fotos de cachorros.'}]),
E('uber','ver','Táxis contra aplicativos','Taxistas bloqueiam o centro contra os aplicativos de transporte.',[
 {l:'Defender os taxistas',fx:{apo:2,am:-2},r:'Buzinaço em sua homenagem.'},
 {l:'Defender os motoristas de aplicativo',fx:{am:2,apo:1,aa:1},r:'Os taxistas prometeram não votar em você.'},
 {l:'Propor regulamentação para os dois',fx:{ip:2,cp:2},r:'Seu projeto virou lei.'}]),
E('padroeira','ver','A festa da padroeira','A comissão da festa da padroeira pede verba da Câmara.',[
 {l:'Destinar sua emenda à festa',fx:{apo:3,f:0},r:'Seu nome foi lido no fim da missa.'},
 {l:'Preferir a creche',fx:{am:2,apo:-1},r:'O padre fez uma oração pela sua consciência.'}]),
// ---------- PREFEITO ----------
E('rombo','pref','O rombo herdado','Você assumiu e descobriu: o antecessor deixou dívidas de 18% do orçamento.',[
 {l:'Denunciar publicamente',fx:{am:2,ip:-2},r:'Todos agora sabem que a culpa não é sua. Por enquanto.'},
 {l:'Renegociar em silêncio',fx:{f:3,ip:1},r:'Os credores aceitaram parcelar.'},
 {l:'Cortar programas sociais',fx:{f:6,apo:-5},r:'As contas melhoraram. A periferia sentiu.'}],{once:true}),
E('garis','pref','Greve dos garis','Os garis pararam por salários atrasados. O lixo acumula nas calçadas.',[
 {l:'Pagar os atrasados',fx:{f:-5,apo:2},r:'O lixo sumiu em dois dias.'},
 {l:'Terceirizar a coleta',fx:{f:2,rj:3,apo:-2},r:'A nova empresa foi contratada em regime de emergência.'},
 {l:'Endurecer',fx:{am:1,apo:-3},r:'A greve durou mais três semanas.'}]),
E('dengue','pref','Epidemia de dengue','Os casos de dengue triplicaram. Postos de saúde estão lotados.',[
 {l:'Mutirão contra os focos',fx:{apo:3,f:-3},r:'Os casos começaram a cair.'},
 {l:'Fumacê em toda a cidade',fx:{apo:1,f:-2},r:'Efeito visível, resultado limitado.'},
 {l:'Culpar o governo estadual',fx:{ip:-2,apo:-1},r:'A briga não matou nenhum mosquito.'}]),
E('camara_trava','pref','A Câmara trava o orçamento','Os vereadores não votam a Lei Orçamentária e exigem cargos.',[
 {l:'Entregar cargos',fx:{ip:6,et:-3},r:'O orçamento passou em uma sessão.'},
 {l:'Expor os vereadores nas redes',fx:{apo:2,am:2,ip:-4},r:'A pressão popular funcionou parcialmente.'},
 {l:'Liberar emendas',fx:{ip:3,f:-3},r:'Acordo fechado.'}]),
E('shopping','pref','O shopping na área de preservação','Um grupo quer construir um shopping em área de preservação ambiental, com mil empregos.',[
 {l:'Aprovar',fx:{f:5,aa:2,et:-2,rj:2},r:'Máquinas chegaram na semana seguinte.'},
 {l:'Negar',fx:{et:3,aa:-1,am:1},r:'O grupo levou o shopping para a cidade vizinha.'},
 {l:'Aprovar com contrapartidas ambientais',fx:{f:3,et:1,cp:1},r:'Parque novo e mil empregos.'}]),
E('deslizamento','pref','Deslizamento no morro','A chuva provocou deslizamentos. Há vítimas e centenas de desalojados.',[
 {l:'Comandar pessoalmente a resposta',fx:{apo:4,am:2,f:-5},r:'Você dormiu no centro de comando por uma semana.'},
 {l:'Pedir socorro federal',fx:{f:3,cp:1,apo:1},r:'A Defesa Civil Nacional chegou em 24 horas.'}],{once:true}),
E('tarifa','pref','A tarifa de ônibus','As empresas de ônibus exigem reajuste de 15% na tarifa.',[
 {l:'Aumentar a tarifa',fx:{f:4,apo:-5,am:-2},r:'Estudantes ocuparam a Câmara.'},
 {l:'Subsidiar',fx:{f:-5,apo:2},r:'A tarifa ficou congelada, o caixa encolheu.'},
 {l:'Congelar e auditar as empresas',fx:{et:2,aa:1,am:2,ip:-1},r:'A auditoria achou custos inflados.'}]),
E('concurso_fraude','pref','Concurso suspeito','Denúncias apontam fraude no concurso para a Guarda Municipal.',[
 {l:'Anular o concurso',fx:{et:4,am:2,f:-1},r:'Novo concurso em seis meses.'},
 {l:'Manter o resultado',fx:{rj:3,am:-2},r:'O Ministério Público entrou com ação.'}]),
E('conjuge','pref','Sua família quer cargo','Seu cônjuge quer assumir a Secretaria de Assistência Social, como fazem muitos prefeitos.',[
 {l:'Nomear',fx:{et:-2,apo:1},r:'O STF já admitiu cargo político para parentes, mas a imprensa não perdoou.'},
 {l:'Não nomear',fx:{et:1},r:'O jantar em casa ficou silencioso.'}],{once:true}),
E('visita_pres','pref','O presidente vem à cidade','O presidente da República quer inaugurar uma obra federal em {cidade}. Ele é adversário do {partido}.',[
 {l:'Receber com honras',fx:{f:4,pt:-4,cp:2},r:'Nova verba federal chegou na semana seguinte.'},
 {l:'Boicotar a cerimônia',fx:{pt:4,f:-2},r:'O partido aplaudiu.'}]),
E('merenda','pref','A merenda estragada','Pais filmaram carne estragada na merenda escolar.',[
 {l:'Romper o contrato com a fornecedora',fx:{am:3,et:2,f:-2},r:'Nova empresa, merenda melhor.'},
 {l:'Defender a empresa',fx:{rj:4,am:-4},r:'O dono da empresa é seu doador. Agora todos sabem.'}]),
E('iptu','pref','Anistia do IPTU','Vereadores propõem anistia de multas do IPTU atrasado.',[
 {l:'Sancionar a anistia',fx:{apo:3,am:2,f:-3},r:'Fila nas agências para renegociar.'},
 {l:'Vetar e cobrar',fx:{f:4,am:-2},r:'A arrecadação subiu.'}]),
E('festa','pref','A festa da cidade','Os organizadores querem um cantor sertanejo famoso no aniversário da cidade. O cachê é de R$ 900 mil.',[
 {l:'Contratar',fx:{apo:4,am:1,f:-4,rj:2},r:'Cem mil pessoas na praça.'},
 {l:'Fazer festa com artistas locais',fx:{am:1,apo:-1,f:-1},r:'Festa menor, contas em dia.'}]),
E('fabrica_fecha','pref','A fábrica vai fechar','A maior empregadora da cidade anunciou que vai fechar e demitir 2 mil pessoas.',[
 {l:'Oferecer isenção para ficar',fx:{f:-4,apo:2,aa:1},r:'A fábrica ficou por mais cinco anos.'},
 {l:'Criar frente de trabalho emergencial',fx:{apo:3,f:-3},r:'As frentes amenizaram o desemprego.'},
 {l:'Buscar novas empresas',fx:{cp:2,aa:2,apo:-2},p:.5,r:'Uma empresa de logística assumiu o galpão.',fail:{fx:{apo:-2},r:'Nenhuma empresa apareceu a tempo.'}}],{once:true}),
E('guarda','pref','Armar a Guarda Municipal','Uma parte da cidade quer a Guarda Municipal armada.',[
 {l:'Armar a Guarda',fx:{am:3,aa:1,apo:-1,f:-2},r:'Treinamento iniciado.'},
 {l:'Investir em iluminação e câmeras',fx:{am:1,apo:2,f:-2},r:'Os índices de furto caíram.'}]),
E('creches','pref','O MP cobra as creches','O Ministério Público obteve decisão judicial: a prefeitura precisa criar 3 mil vagas em creche.',[
 {l:'Cumprir com convênios',fx:{apo:3,f:-5},r:'As vagas foram abertas.'},
 {l:'Recorrer',fx:{f:1,am:-3,rj:2},r:'Mães acamparam na frente da prefeitura.'}]),
// ---------- DEPUTADOS ----------
E('emendas_relator','dfed','PEC das Emendas de Relator','O relator do orçamento oferece dezenas de milhões em emendas sem identificação do autor, em troca do seu voto fiel.',[
 {l:'Aceitar o esquema',fx:{apo:6,ip:5,et:-6,rj:12},set:'relator',r:'Asfalto em todas as suas cidades. Auditores do TCU anotaram tudo.'},
 {l:'Recusar e denunciar',fx:{et:4,aa:3,cp:-5,ip:-6},r:'Você virou outsider. Seus projetos foram para a gaveta.'}],{once:true}),
E('relator_tcu','dfed','O TCU chega às emendas','Auditores do TCU rastrearam as emendas do orçamento secreto até as suas cidades.',[
 {l:'Defender a legalidade',fx:{rj:5,aa:-2},r:'O caso foi para o STF.'},
 {l:'Culpar os prefeitos',fx:{rj:2,ip:-4,apo:-2},r:'Os prefeitos não vão esquecer.'}],{req:()=>F('relator'),w:4,once:true}),
E('reforma_trib','dest,dfed','Reforma tributária','A reforma tributária chega a plenário. Seu setor econômico mais forte quer uma exceção.',[
 {l:'Votar com o governo',fx:{ip:4,cp:1},r:'A reforma passou.'},
 {l:'Votar contra',fx:{aa:2,ip:-3},r:'A reforma passou mesmo assim.'},
 {l:'Negociar uma exceção para o setor',fx:{cp:3,$:10,rj:3,aa:1},r:'Você ganhou o setor. Os economistas reclamaram.'}]),
E('jatinho','dest,dfed','O jatinho do empresário','Um empresário oferece carona no jatinho dele para você ir à sua base no fim de semana.',[
 {l:'Aceitar',fx:{rj:3,et:-2},r:'Foto na pista. Repórter na pista também.'},
 {l:'Ir de voo comercial',fx:{et:1},r:'Sem histórias.'}]),
E('cota','dest,dfed','A cota parlamentar','Um site de transparência mostra gastos altos da sua cota com combustível: 40 mil km em um mês.',[
 {l:'Devolver o dinheiro e explicar',fx:{et:2,$:-6,am:1},r:'Era um erro do posto. Você pagou.'},
 {l:'Dizer que é perseguição',fx:{am:-3,rj:3},r:'O Ministério Público abriu procedimento.'}]),
E('cassacao_colega','dest,dfed','A cassação do colega','O plenário vota a cassação de um colega flagrado recebendo propina.',[
 {l:'Votar pela cassação',fx:{et:3,am:2,ip:-3},r:'Ele foi cassado. Os amigos dele anotaram.'},
 {l:'Votar pela absolvição',fx:{ip:4,am:-4},r:'Ele foi salvo por três votos.'},
 {l:'Se abster',fx:{am:-1},r:'Ninguém lembra do seu voto.'}]),
E('fundao','dest,dfed','O fundão','O Congresso vota aumentar o Fundo Eleitoral para R$ 6 bilhões.',[
 {l:'Votar a favor',fx:{pt:5,$:15,am:-5},r:'O partido terá mais dinheiro para sua campanha.'},
 {l:'Votar contra',fx:{am:4,pt:-6},r:'O partido lembrou disso na hora de dividir o fundo.'}]),
E('pres_camara','dfed','Eleição da Mesa','Dois candidatos disputam a presidência da Câmara. Seu voto é secreto, mas todos querem saber.',[
 {l:'Apoiar o candidato do governo',p:.6,fx:{ip:5,cp:2},r:'Ele venceu e lembrou de você na distribuição de relatorias.',fail:{fx:{ip:-4},r:'Ele perdeu. O vencedor sabe em quem você votou.'}},
 {l:'Apoiar o candidato independente',p:.4,fx:{cp:6,ip:3},r:'Zebra. Seu candidato venceu.',fail:{fx:{ip:-3,cp:-1},r:'Ele perdeu, como esperado.'}}]),
E('pl_fake','dfed','PL das Fake News','O projeto de regulação das plataformas digitais vai a voto.',[
 {l:'Votar a favor',fx:{aa:2,am:-1,et:1},r:'As big techs fizeram campanha contra você.'},
 {l:'Votar contra',fx:{am:2,aa:-2},r:'As redes amaram.'}]),
E('prefeitos_verba','dest,dfed','A fila dos prefeitos','Vinte prefeitos do interior fazem fila no seu gabinete pedindo verba.',[
 {l:'Atender a todos com emendas',fx:{apo:3,ip:2,cp:2},ally:{t:'prefeito',shady:false},r:'Você agora tem vinte cabos eleitorais de luxo.'},
 {l:'Priorizar só os aliados',fx:{pt:2,ip:1},r:'Os outros foram procurar {rival}.'}]),
E('bets_rel','dfed','O lobby das apostas','Representantes das casas de apostas querem você como relator do projeto que reduz impostos do setor.',[
 {l:'Aceitar a relatoria e a “gratidão”',fx:{$:30,cp:3,rj:9,et:-6},r:'A gratidão veio em forma de doações a laranjas.'},
 {l:'Recusar',fx:{et:2},r:'Outro deputado aceitou.'}],{once:true}),
E('pec_blind','dest,dfed','PEC da Blindagem','A PEC que exige autorização da Casa para processar parlamentares vai a votação.',[
 {l:'Votar a favor',fx:{rj:-6,ip:4,am:-5,aa:-4},r:'Seus colegas comemoraram. As ruas encheram de protestos.'},
 {l:'Votar contra',fx:{am:3,aa:3,ip:-3},r:'Você virou alvo de colegas no café.'}],{once:true}),
E('ministerio','dfed','Convite para ministério','O presidente convida você para assumir um ministério. Você se licenciaria do mandato.',[
 {l:'Aceitar',fx:{cp:6,ip:3,aa:2,pt:3},r:'Você agora despacha na Esplanada.'},
 {l:'Recusar e manter independência',fx:{et:1,cp:1},r:'O presidente não esqueceu a recusa.'}],{once:true}),
E('cpi_energia','dest','CPI da Energia','A Assembleia abre CPI sobre a concessionária de energia do estado.',[
 {l:'Pedir a relatoria',fx:{cp:4,aa:2,am:2,ip:-2},r:'Seu relatório pediu o fim da concessão.'},
 {l:'Blindar a empresa',fx:{$:15,rj:5,et:-3},r:'A empresa ficou grata.'}]),
E('servidores','dest','Greve dos servidores estaduais','Servidores estaduais param por reajuste. O governador pede seu voto contra.',[
 {l:'Votar com o governador',fx:{ip:4,am:-3},r:'O governador ficou devendo.'},
 {l:'Votar com os servidores',fx:{am:4,apo:1,ip:-4},r:'Os servidores viraram sua base.'}]),
E('tce','dest','Vaga no Tribunal de Contas','O governador oferece indicá-lo(a) para conselheiro(a) vitalício(a) do Tribunal de Contas do Estado.',[
 {l:'Aceitar a vaga vitalícia',fx:{},r:'Você troca as urnas por um gabinete até os 75 anos.',end:'tce'},
 {l:'Recusar e seguir na política',fx:{cp:2},r:'Você ainda quer voar mais alto.'}],{req:s=>s.cp>=55&&S.age>=38,once:true}),
// ---------- SENADO ----------
E('stf_sab','sen','Sabatina para o STF','O presidente indicou um aliado pessoal para o STF. A votação no plenário é secreta.',[
 {l:'Aprovar o indicado',fx:{ip:4,et:-1},r:'O novo ministro tomou posse.'},
 {l:'Rejeitar o indicado',fx:{cp:5,ip:-4,aa:2},r:'Pela primeira vez em décadas, o Senado rejeitou uma indicação.'}]),
E('bc_sab','sen','O novo presidente do Banco Central','O governo quer um presidente do Banco Central que baixe os juros rapidamente.',[
 {l:'Aprovar',fx:{ip:3,aa:-2,apo:1},r:'O mercado tremeu.'},
 {l:'Exigir compromisso com a meta de inflação',fx:{aa:3,cp:2,ip:-2},r:'O indicado assumiu o compromisso.'}]),
E('impeach_stf','sen','Impeachment de ministro do STF','Senadores coletam assinaturas para o impeachment de um ministro do Supremo.',[
 {l:'Assinar',fx:{am:3,apo:1,aa:-3,rj:3},r:'O ministro passou a acompanhar seu nome com atenção.'},
 {l:'Recusar',fx:{aa:2,am:-2},r:'Redes radicais chamaram você de covarde.'}]),
E('pres_senado','sen','Presidência do Senado','Aliados sugerem que você dispute a presidência do Senado.',[
 {l:'Disputar',p:s=>clamp((s.cp+s.ip)/200,0.1,.85),fx:{cp:10,ip:6},r:'Você agora preside o Congresso Nacional.',fail:{fx:{cp:-4,ip:-4},r:'Você perdeu por poucos votos.'}},
 {l:'Apoiar um aliado',fx:{ip:3},r:'Ele ficou devendo.'}],{req:s=>s.cp>=50,once:true}),
E('reforma_pol','sen','Voto distrital misto','O Senado debate trocar o sistema proporcional pelo voto distrital misto.',[
 {l:'Defender a mudança',fx:{aa:3,pt:-3},r:'Os partidos pequenos odiaram.'},
 {l:'Manter o sistema atual',fx:{pt:3},r:'Nada mudou.'}]),
E('cpi_sen','sen','A CPI no Senado','Uma CPI investiga o governo federal. Você pode ser vice-presidente.',[
 {l:'Assumir e investigar com rigor',fx:{aa:3,am:3,cp:3,ip:-3},r:'Os depoimentos lotaram a audiência da TV Senado.'},
 {l:'Recusar para não brigar com o Planalto',fx:{ip:3},r:'O Planalto agradeceu.'}]),
// ---------- GOVERNADOR ----------
E('rebeliao','gov','Rebelião no presídio','Detentos fizeram agentes penitenciários reféns no maior presídio do estado.',[
 {l:'Negociar',p:.7,fx:{et:1,am:-1},r:'Os reféns foram libertados sem mortes.',fail:{fx:{am:-4},r:'A negociação se arrastou e a imprensa falou em fraqueza.'}},
 {l:'Mandar a tropa de choque',p:.5,fx:{am:3,aa:1},r:'Rebelião controlada em duas horas.',fail:{fx:{am:-5,apo:-3,rj:5,et:-3},r:'A invasão deixou mortos. Entidades internacionais cobram explicações.'}},
 {l:'Pedir a Força Nacional',fx:{cp:-2,ip:2},r:'O governo federal assumiu a crise.'}]),
E('greve_pm','gov','Greve da PM','Policiais militares cruzaram os braços. Saques começam nas cidades.',[
 {l:'Conceder aumento',fx:{f:-8,am:2},r:'A tropa voltou às ruas.'},
 {l:'Pedir as Forças Armadas',fx:{cp:-1,am:1,f:-2},r:'O Exército patrulhou as ruas por dez dias.'},
 {l:'Negociar abono parcial',fx:{f:-4,ip:1},r:'Parte da tropa voltou.'}]),
E('rrf','gov','O Regime de Recuperação Fiscal','O Tesouro oferece suspender a dívida do estado em troca de congelar salários e privatizar.',[
 {l:'Aderir',fx:{f:10,am:-4,apo:-2},r:'O estado ganhou fôlego. Servidores protestaram.'},
 {l:'Recusar',fx:{f:-4,am:2},r:'O caixa seguiu no vermelho.'}],{once:true}),
E('montadora','gov','A montadora','Uma montadora chinesa escolhe entre seu estado e o vizinho. Exige 15 anos sem ICMS.',[
 {l:'Oferecer tudo',fx:{f:-5,am:4,apo:2},r:'Cinco mil empregos chegando.'},
 {l:'Oferecer metade',p:.5,fx:{f:-2,am:2},r:'Eles aceitaram.',fail:{fx:{am:-1},r:'A fábrica foi para o vizinho.'}},
 {l:'Recusar a guerra fiscal',fx:{et:1,aa:1},r:'O vizinho comemorou.'}]),
E('chacina','gov','Operação com mortes','Uma operação policial em uma comunidade deixou 14 mortos.',[
 {l:'Defender a polícia',fx:{am:2,aa:-2,et:-4,rj:3},r:'Parte da população aplaudiu. A ONU cobrou.'},
 {l:'Afastar o comando da operação',fx:{et:3,am:-2},r:'Policiais protestaram contra você.'},
 {l:'Investigação independente',fx:{et:2,aa:2},r:'As conclusões vão levar meses.'}]),
E('folha','gov','Folha atrasada','Não há dinheiro para pagar a folha dos servidores deste mês.',[
 {l:'Parcelar os salários',fx:{f:3,am:-4,apo:-2},r:'Servidores receberam em três vezes.'},
 {l:'Antecipar royalties',fx:{f:4,rj:1},r:'O problema voltou no ano seguinte.'},
 {l:'Pedir socorro à União',fx:{f:5,cp:-2,pt:-2},r:'O ministro da Fazenda impôs condições.'}]),
E('enchente_est','gov','A grande enchente','Enchentes atingiram 200 municípios do estado. É a maior tragédia climática da história local.',[
 {l:'Comandar a reconstrução',fx:{apo:4,am:3,f:-6},r:'Você virou o rosto da reconstrução.'},
 {l:'Pedir recursos federais',fx:{f:4,ip:2},r:'O dinheiro chegou com atraso.'}],{once:true}),
E('universidade_est','gov','A universidade estadual','Os reitores avisam que a universidade estadual vai fechar por falta de verba.',[
 {l:'Recompor o orçamento',fx:{aa:2,am:3,f:-4},r:'Professores agradeceram.'},
 {l:'Cobrar eficiência',fx:{f:2,am:-3},r:'Estudantes ocuparam a reitoria.'}]),
E('faccao','gov','Facção nos portos','Uma facção criminosa domina o porto e o tráfico de cocaína para a Europa.',[
 {l:'Força-tarefa com a PF',fx:{am:3,aa:2,cp:2,f:-2},r:'Toneladas apreendidas.'},
 {l:'Ignorar o problema',fx:{rj:2,am:-2},r:'A violência subiu.'}]),
// ---------- PRESIDENTE ----------
E('previdencia','pres','A reforma da Previdência','O déficit da Previdência explodiu e as centrais sindicais ameaçam greve geral.',[
 {l:'Austeridade sem concessões',fx:{f:12,aa:6,apo:-8,am:-2},r:'O mercado aplaudiu. As periferias foram às ruas.'},
 {l:'Desidratar a proposta',fx:{f:-4,apo:2,aa:-4},r:'Dólar subiu, inflação também.'},
 {l:'Entregar estatais ao Centrão por 350 votos',fx:{ip:15,f:8,et:-12,rj:8},r:'Reforma aprovada com folga. Sua conformidade ética virou pó.'}],{once:true}),
E('cambio','pres','O dólar dispara','O dólar subiu 20% em um mês por causa de uma crise no exterior.',[
 {l:'Vender reservas',fx:{f:-3,aa:2},r:'O câmbio estabilizou.'},
 {l:'Culpar especuladores',fx:{apo:2,aa:-4},r:'O dólar subiu mais.'}]),
E('epidemia','pres','Uma nova epidemia','Um vírus respiratório se espalha pelo país. Hospitais começam a lotar.',[
 {l:'Seguir a ciência e coordenar com estados',fx:{aa:3,am:2,et:2,f:-6},r:'A curva começou a cair.'},
 {l:'Minimizar para proteger a economia',fx:{aa:1,am:-4,apo:-3,et:-4,rj:5},r:'Os hospitais colapsaram.'}],{once:true}),
E('estatal_esc','pres','Escândalo na estatal','Um diretor da petroleira estatal foi flagrado recebendo propina de fornecedores.',[
 {l:'Demitir e abrir auditoria',fx:{et:2,ip:-3},r:'O partido dele ameaçou deixar a base.'},
 {l:'Proteger o diretor',fx:{ip:2,rj:6,et:-5},r:'O caso foi parar no STF.'}]),
E('acordo','pres','O acordo comercial','Depois de 25 anos, o acordo Mercosul–União Europeia pode ser assinado. O agro adora; a indústria teme.',[
 {l:'Assinar',fx:{aa:3,cp:3,am:-1},r:'Foto histórica em Bruxelas.'},
 {l:'Exigir proteção à indústria',fx:{am:2,aa:-2},r:'As negociações continuam.'}]),
E('caminhoneiros','pres','Greve dos caminhoneiros','Caminhoneiros bloqueiam 300 pontos de rodovias contra o preço do diesel e pelo piso mínimo do frete.',[
 {l:'Fortalecer o piso da ANTT e a fiscalização do frete',fx:{apo:3,aa:-3,f:-1},r:'A categoria liberou as estradas.'},
 {l:'Subsidiar o diesel',fx:{f:-6,apo:2},r:'O bloqueio acabou. A conta ficou com o Tesouro.'},
 {l:'Usar a Força Nacional para desbloquear',fx:{aa:2,am:-2,apo:-3},r:'Os bloqueios caíram em três dias, com tensão.'}],{once:true}),
E('amazonia','pres','Pressão pela Amazônia','O desmatamento bateu recorde e países europeus ameaçam boicotar produtos brasileiros.',[
 {l:'Operação federal de fiscalização',fx:{aa:3,et:2,apo:-1,f:-2},r:'O desmatamento caiu 30%.'},
 {l:'Dizer que a Amazônia é nossa',fx:{am:2,aa:-3},r:'Os boicotes começaram.'}]),
E('juros','pres','Banco Central contra o Planalto','O Banco Central subiu os juros para 15%. Sua base quer que você ataque o presidente do BC.',[
 {l:'Atacar o Banco Central',fx:{apo:2,aa:-6,f:-2},r:'O mercado reagiu mal.'},
 {l:'Respeitar a autonomia',fx:{aa:3,apo:-1},r:'Sua base reclamou.'}]),
E('centrao','pres','O Centrão ameaça desembarcar','Os partidos do centro dizem que deixarão a base se não ganharem mais dois ministérios.',[
 {l:'Entregar os ministérios',fx:{ip:6,et:-3,aa:-1},r:'A base voltou a votar com o governo.'},
 {l:'Chamar o blefe',p:.45,fx:{cp:4},r:'Era blefe. Você saiu mais forte.',fail:{fx:{ip:-10},r:'Não era blefe. Você perdeu a maioria.'}}]),
E('ministro_esc','none_x','Ministro sob suspeita','Seu ministro mais próximo é investigado por favorecer a empresa da família.',[
 {l:'Demitir',fx:{et:2,cp:-2},r:'Você perdeu um amigo e ganhou credibilidade.'},
 {l:'Manter',fx:{rj:5,am:-3},r:'O caso não para de crescer.'}]),
E('tarifas','pres','Guerra tarifária','Uma potência estrangeira impôs tarifa de 50% sobre produtos brasileiros.',[
 {l:'Retaliar',fx:{am:3,apo:2,aa:-3},r:'A popularidade subiu. As exportações caíram.'},
 {l:'Negociar em silêncio',fx:{aa:3,cp:2},p:.6,r:'As tarifas foram reduzidas.',fail:{fx:{am:-2},r:'Nada mudou e você pareceu fraco(a).'}}]),
E('arrecadacao','pres','Arrecadação recorde','A arrecadação federal bateu recorde histórico.',[
 {l:'Fazer superávit',fx:{f:6,aa:3},r:'A dívida pública caiu.'},
 {l:'Ampliar investimentos sociais',fx:{apo:4,am:1,f:2},r:'Os programas sociais foram ampliados.'}],{once:true}),
E('atos','pres','Atos contra as instituições','Manifestantes pedem o fechamento do Congresso e do STF. Alguns acampam em frente a quartéis.',[
 {l:'Condenar e acionar a Justiça',fx:{et:3,aa:3,cp:2,am:-2},r:'As instituições saíram fortalecidas.'},
 {l:'Ficar em silêncio',fx:{et:-3,ip:-2},r:'O silêncio foi lido como apoio.'},
 {l:'Incentivar os atos',fx:{am:2,et:-10,rj:15,ip:-10},r:'Você abriu uma crise institucional que vai cobrar seu preço.'}],{once:true}),
E('stf_vaga','pres','Vaga no Supremo','Um ministro do STF se aposentou. Você deve indicar o substituto.',[
 {l:'Indicar um aliado pessoal',fx:{rj:-6,ip:2,et:-3},r:'Um amigo no Supremo pode ser útil.'},
 {l:'Indicar um jurista respeitado',fx:{et:3,aa:3},r:'Aprovação unânime no Senado.'},
 {l:'Negociar a vaga com o Senado',fx:{ip:6,et:-1},r:'O presidente do Senado escolheu o nome.'}],{once:true}),
E('apagao_nac','pres','Risco de apagão','A seca esvaziou os reservatórios. O país pode ter racionamento de energia.',[
 {l:'Decretar racionamento preventivo',fx:{am:-3,aa:1,f:1},r:'Ninguém gostou, mas não houve apagão.'},
 {l:'Ligar todas as termelétricas',fx:{f:-5,aa:-1},r:'A conta de luz subiu 30%.'}]),
E('copa','pres','O Brasil quer sediar a Copa','A Fifa oferece ao Brasil sediar uma Copa do Mundo.',[
 {l:'Aceitar',fx:{apo:3,am:1,f:-6,rj:3},r:'Estádios novos e contratos caros.'},
 {l:'Recusar',fx:{f:1,aa:1,apo:-1},r:'Sobrou dinheiro para hospitais.'}],{once:true}),
// ---------- CAMPANHA ----------
E('dossie_final','*','O dossiê da reta final','A cinco dias da eleição, um blog publica um dossiê contra você.',[
 {l:'Desmentir no horário eleitoral',fx:{camp:2,$:-4},r:'O desmentido chegou a tempo.'},
 {l:'Contra-atacar com um dossiê do adversário',fx:{camp:3,et:-3},r:'A eleição virou guerra de lama.'}],{camp:true}),
E('desiste','*','O adversário quer sair','Um candidato nanico oferece desistir e apoiar você em troca de uma secretaria.',[
 {l:'Aceitar',fx:{camp:4,et:-2},r:'Ele anunciou apoio no dia seguinte.'},
 {l:'Recusar',fx:{et:1},r:'Ele seguiu na disputa tirando seus votos.'}],{camp:true}),
E('empate','*','Empate técnico','A última pesquisa mostra você empatado(a) com {rival}.',[
 {l:'Investir tudo na reta final',fx:{camp:5,$:-15},r:'A última semana foi de outdoors e inserções.'},
 {l:'Manter a estratégia',fx:{camp:1},r:'A campanha seguiu como planejado.'}],{camp:true}),
E('cabo_flagrado','*','Cabo eleitoral flagrado','Um cabo eleitoral da sua campanha foi filmado oferecendo R$ 50 por voto.',[
 {l:'Afastar e denunciar',fx:{et:2,camp:-1},r:'Você saiu da história como vítima.'},
 {l:'Dizer que ele não é da campanha',fx:{rj:4,camp:-2},r:'Fotos dele no seu comitê circularam.'}],{camp:true}),
E('ex_pres','*','O apoio do ex-presidente','Um ex-presidente muito popular pode gravar um vídeo pedindo voto em você.',[
 {l:'Aceitar o apoio',fx:{camp:6,apo:3,aa:-3},r:'O vídeo foi o mais visto da campanha.'},
 {l:'Recusar para não parecer dependente',fx:{camp:-1,cp:1},r:'Você seguiu com voz própria.'}],{camp:true}),
E('laranjas','*','As candidatas laranjas','O partido quer lançar candidatas sem campanha só para cumprir a cota de 30% de mulheres e ficar com o fundo.',[
 {l:'Fechar os olhos',fx:{pt:3,rj:4},r:'O esquema virou investigação depois da eleição.'},
 {l:'Exigir apoio real às candidatas',fx:{et:2,pt:-3,am:1},r:'Duas delas foram eleitas.'}],{camp:true}),
E('chuva','*','Chuva no comício','O comício de encerramento foi atingido por uma tempestade.',[
 {l:'Discursar debaixo da chuva',fx:{camp:4,apo:2},r:'A foto de você encharcado(a) virou símbolo.'},
 {l:'Cancelar',fx:{camp:-2},r:'O adversário fez o comício dele no dia seguinte.'}],{camp:true}),
E('pesquisa_fake','*','A pesquisa encomendada','Um instituto oferece publicar uma pesquisa favorável a você, sem registro no TSE.',[
 {l:'Aceitar',fx:{camp:3,rj:6,et:-4},r:'A pesquisa irregular saiu e foi impugnada.'},
 {l:'Recusar',fx:{et:1},r:'Instituto dispensado.'}],{camp:true}),
E('voto_util','*','O voto útil','Eleitores de um candidato fraco podem migrar para você se você moderar o discurso.',[
 {l:'Moderar o discurso',fx:{camp:4,pt:-2},r:'O voto útil chegou.'},
 {l:'Manter as bandeiras',fx:{pt:2,camp:1},r:'A militância ficou orgulhosa.'}],{camp:true}),
E('sabotagem','*','O comitê pichado','Seu comitê amanheceu pichado e com vidros quebrados.',[
 {l:'Registrar ocorrência e pedir paz',fx:{camp:2,et:1},r:'A solidariedade veio de todos os lados.'},
 {l:'Acusar {rival} sem provas',fx:{camp:1,et:-2},r:'Ele processou você.'}],{camp:true}),
];

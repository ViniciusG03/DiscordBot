/*
 Começando com a declaração das dependências 
*/

const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice");
const config = require("./config.json");
const { createPool } = require("mysql");
const validUrl = require("valid-url");

const {
  Client,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  ChannelType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  ApplicationCommandType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  parseResponse,
  ClientPresence,
  ActivityType,
  Presence,
  PresenceUpdateStatus,
  PresenceStatusData,
  ActionRow,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvents,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.User,
  ],
});

const token = config.token;
const idServer = config.idServer;
const colorEmbed = config.colorEmbed;

const host = config.host;
const user = config.user;
const password = config.password;
const database = config.database;
const ssl = config.ssl;

let connection = createPool({
  // Aqui eu faço a conexão com a nuvem do meu banco de dados
  host: host,
  user: user,
  password: password,
  database: database,
  ssl: ssl,
});

function conectar() {
  connection.getConnection(async (err) => {
    if (err)
      return await console.log(
        `[ERROR MYSQL] Erro ao se conectar no Banco de Dados!\n${err}`
      );
    await console.log(`[MYSQL] Conectado com Sucesso!`);
    await client.login(token);
  });
}

conectar();

client.on("ready", async () => {
  if (!client.guilds.cache.get(idServer))
    return await console.log(`[ERROR BOT] Não estou no servidor!`);
  if (!client.guilds.cache.get(idServer).iconURL())
    return await console.log(
      `[ERROR BOT] Defina uma foto de peril para o servidor!`
    );
  if (!client.user.avatarURL())
    return await console.log(
      `[ERROR BOT] Defina uma foto de perfil para o Bot!`
    );

  client.user.setActivity({
    // Aqui é onde fica setado a atividade do bot
    name: "Use /about",
    type: ActivityType.Streaming,
    url: "https://www.twitch.tv/contemppt",
  });

  // let commands;

  // commands = client.application.commands;

  // await commands.create({
  //   name: "ping",
  //   description: "Verificar Latência",
  // });

  // await commands.create({
  //   name: "say",
  //   description: "[STAFF] Enviar mensagem pelo Bot",
  // });

  // await commands.create({
  //   name: "clear",
  //   description: "[STAFF] Apagar mensagens",
  //   options: [
  //     {
  //       name: "quantidade",
  //       description:
  //         "Defina a quantidade de mensagens à serem deletadas (0/100)",
  //       required: true,
  //       type: ApplicationCommandOptionType.Integer,
  //     },
  //   ],
  // });

  // await commands.create({
  //   name: "lock",
  //   description: "[STAFF] Bloquear canal",
  // });

  // await commands.create({
  //   name: "unlock",
  //   description: "[STAFF] Desbloquear canal",
  // });

  // await commands.create({
  //   name: "about",
  //   description: "Informações do bot",
  // });

  // await commands.create({
  //   name: "ticket",
  //   description: "[STAFF] Mostrar Menu Ticket",
  // });

  // await commands.create({
  //   name: "kick",
  //   description: "[STAFF] Expulsar membro do servidor!",
  //   options: [
  //     {
  //       name: "membro",
  //       description: "Defina o membro",
  //       required: true,
  //       type: ApplicationCommandOptionType.User,
  //     },
  //     {
  //       name: "motivo",
  //       description: "Defina o motiva da expulsão",
  //       required: false,
  //       type: ApplicationCommandOptionType.String,
  //     },
  //   ],
  // });

  // await commands.create({
  //   name: "join",
  //   description: "Faz o bot entrar em um canal de voz!",
  // });

  // await commands.create({
  //   name: "leave",
  //   description: "Faz o bot sair do canal de voz!",
  // });

  // await commands.create({
  //   name: "ban",
  //   description: "[STAFF] Banir membro",
  //   options: [
  //     {
  //       name: "user",
  //       description: "Membro a ser banido",
  //       type: ApplicationCommandOptionType.User,
  //       required: true,
  //     },
  //     {
  //       name: "reason",
  //       description: "Motivo do banimento",
  //       type: ApplicationCommandOptionType.String,
  //       required: false,
  //     },
  //   ],
  // });

  // await commands.create({
  //   name: "unban",
  //   description: "[STAFF] Desbanir membro",
  //   options: [
  //     {
  //       name: "user",
  //       description: "Membro a ser desbanido",
  //       type: ApplicationCommandOptionType.User,
  //       required: true,
  //     },
  //   ],
  // });

  // await commands.create({
  //   name: "fembed",
  //   description: "[STAFF] Criar Embed",
  // });

  // await commands.create({
  //   name: "caduser",
  //   description: "Cadastrar Usuário",
  //   options: [
  //     {
  //       name: "nome",
  //       description: "Define o nome",
  //       required: true,
  //       type: ApplicationCommandOptionType.String,
  //     },
  //     {
  //       name: "idade",
  //       description: "Defina a idade",
  //       required: true,
  //       type: ApplicationCommandOptionType.Integer,
  //     },
  //   ],
  // });

  // await commands.create({
  //   name: "veallusers",
  //   description: "Verificar todos os usuários cadastrados",
  // });

  // await commands.create({
  //   name: "veuser",
  //   description: "Verificar um usuário cadastrado",
  //   options: [
  //     {
  //       name: "id",
  //       description: "Defina o ID",
  //       required: true,
  //       type: ApplicationCommandOptionType.Integer,
  //     },
  //   ],
  // });

  // await commands.create({
  //   name: "upuser",
  //   description: "Atualizar usuário",
  //   options: [
  //     {
  //       name: "valor",
  //       description: "Defina o que sera atualizado",
  //       required: true,
  //       type: ApplicationCommandOptionType.String,
  //     },
  //     {
  //       name: "campo",
  //       description: "Defina o campo que ser atualizado",
  //       required: true,
  //       type: ApplicationCommandOptionType.String,
  //       choices: [
  //         {
  //           name: "nome",
  //           value: "name",
  //         },
  //         {
  //           name: "Idade",
  //           value: "age",
  //         },
  //       ],
  //     },
  //     {
  //       name: "id",
  //       description: "Defina o ID do usuário",
  //       required: true,
  //       type: ApplicationCommandOptionType.Integer,
  //     },
  //   ],
  // });

  // await commands.create({
  //   name: "deluser",
  //   description: "Deletar usuário",
  //   options: [
  //     {
  //       name: "id",
  //       description: "Defina o ID do usuário que será deletado",
  //       required: true,
  //       type: ApplicationCommandOptionType.Integer,
  //     },
  //   ],
  // });

  await console.log(`${client.user.username} Conectado!`);
});

client.on("interactionCreate", async (interaction) => {
  const filter = (m) => m.author.id == interaction.user.id;

  if (interaction.isCommand()) {
    if (interaction.commandName == "ping") {
      const embedPing = new EmbedBuilder()
        .setDescription(
          "__**PING**__\n\n> ***Ping:*** *`" +
            `${Date.now() - interaction.createdTimestamp}ms` +
            "`*\n> ***API Ping:*** *`" +
            `${Math.round(client.ws.ping)}ms` +
            "`*"
        )
        .setTimestamp()
        .setColor(colorEmbed)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setFooter({
          text: client.user.username + " " + "By" + " " + `Contempt`,
          iconURL: interaction.guild.iconURL({ dynamic: true }),
        });

      await interaction.reply({ embeds: [embedPing], ephemeral: true });
    }

    if (interaction.commandName == "say") {
      if (
        !interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)
      )
        return await interaction.reply({
          content: `Você não tem permissão para usar este comando!`,
          ephemeral: true,
        });

      const veChannel = await interaction.guild.channels.cache.find(
        (c) => c.name == `say-${interaction.user.id}`
      );
      if (veChannel)
        return await interaction.reply({
          content: `Já existe um canal em aberto!`,
          ephemeral: true,
        });
      await interaction.guild.channels
        .create({
          name: `say-${interaction.user.id}`,
          type: ChannelType.GuildText,
          permissionOverwrites: [
            {
              id: interaction.guild.roles.everyone.id,
              deny: ["ViewChannel"],
            },
            {
              id: interaction.user.id,
              allow: ["SendMessages", "ViewChannel"],
            },
          ],
        })
        .then(async (channel) => {
          await interaction.reply({
            content: `Seu canal foi criado com Sucesso. Clique aqui para ir até ele: <#${channel.id}>`,
            ephemeral: true,
          });
          const embedSay = new EmbedBuilder()
            .setDescription(
              `__**SAY**__\n\n> *Defina a mensagem que será enviada*\n> *Você tem 5 minutos para enviar*`
            )
            .setTimestamp()
            .setColor(colorEmbed)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setFooter({
              text: client.user.username + " " + "By" + " " + `Contempt`,
              iconURL: interaction.guild.iconURL({ dynamic: true }),
            });

          const btnCancelar = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("btnCancelar")
              .setLabel("Cancelar")
              .setStyle(ButtonStyle.Danger)
          );

          await channel.send({
            content: `||***[ <@${interaction.user.id}> ]***||`,
            embeds: [embedSay],
            components: [btnCancelar],
          });

          await channel
            .awaitMessages({ filter, max: 1, time: 300000 })
            .then(async (resposta) => {
              const veChannel = await interaction.guild.channels.cache.find(
                (c) => c.name == `say-${interaction.user.id}`
              );
              if (!veChannel) return;

              if (resposta.size <= 0) {
                await channel.permissionOverwrites.set([
                  {
                    id: interaction.guild.roles.everyone.id,
                    deny: ["ViewChannel"],
                  },
                  {
                    id: interaction.user.id,
                    allow: ["ViewChannel"],
                    deny: ["SendMessages"],
                  },
                ]);

                await setTimeout(
                  () =>
                    channel.messages
                      .fetch({ limit: 99 })
                      .then(async (messages) => {
                        await channel.bulkDelete(messages);

                        const embedMensagemDeletando = new EmbedBuilder()
                          .setDescription(
                            `__**TEMPO ESGOTADO**__\n\n> *Deletando canal em 10 segundos...*`
                          )
                          .setColor(colorEmbed);

                        await channel.send({
                          embeds: [embedMensagemDeletando],
                        });
                        await setTimeout(
                          () =>
                            channel.messages
                              .fetch({ limit: 1 })
                              .then(async () => {
                                await setTimeout(
                                  () =>
                                    channel.delete().catch(async (err) => {
                                      return;
                                    }),
                                  1
                                );
                              })
                              .catch(async (err) => {
                                return;
                              }),
                          10000
                        );
                      })
                      .catch(async (err) => {
                        return;
                      }),
                  1
                );
              }

              const msg = await resposta.first().content;

              if (msg.length > 2000) {
                await channel.permissionOverwrites.set([
                  {
                    id: interaction.guild.roles.everyone.id,
                    deny: ["ViewChannel"],
                  },
                  {
                    id: interaction.user.id,
                    allow: ["ViewChannel"],
                    deny: ["SendMessages"],
                  },
                ]);

                await setTimeout(
                  () =>
                    channel.messages
                      .fetch({ limit: 99 })
                      .then(async (messages) => {
                        await channel.bulkDelete(messages);

                        const embedMensagemDeletando = new EmbedBuilder()
                          .setDescription(
                            `__**MENSAGEM MUITO GRANDE!**__\n\n> *Deletando canal em 10 segundos...*`
                          )
                          .setColor(colorEmbed);

                        await channel.send({
                          embeds: [embedMensagemDeletando],
                        });
                        await setTimeout(
                          () =>
                            channel.messages
                              .fetch({ limit: 1 })
                              .then(async () => {
                                await setTimeout(
                                  () =>
                                    channel.delete().catch(async (err) => {
                                      return;
                                    }),
                                  1
                                );
                              })
                              .catch(async (err) => {
                                return;
                              }),
                          10000
                        );
                      })
                      .catch(async (err) => {
                        return;
                      }),
                  1
                );
              }

              await interaction.channel.send({ content: `${msg}` });
              await channel.delete().catch(async () => {
                return;
              });
            })
            .catch(async (err) => {
              await channel.send({
                content: `[ERROR BOT] Houve um erro ao coletar a resposta!`,
              });
              return await console.log(
                `[ERROR BOT] Houve um erro ao coletar a resposta!\n${err}`
              );
            });
        })
        .catch(async (err) => {
          await interaction.reply({
            content: `[ERROR BOT] Houve um erro ao criar o canal! Tente novamente!`,
            ephemeral: true,
          });
          return await console.log(
            `[ERROR BOT] Houve um erro ao criar o canal!\n${err}`
          );
        });
    }

    if (interaction.commandName == "clear") {
      if (
        !interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)
      )
        return await interaction.reply({
          content: `Você não tem permissão para usar este comando!`,
          ephemeral: true,
        });
      const quant = await interaction.options.getInteger("quantidade");

      await interaction.channel.messages
        .fetch({ limit: quant })
        .then(async (messages) => {
          await interaction.channel.bulkDelete(messages);
          await interaction.reply({
            content: `Foi deletado um total de ${messages.size} mensagens.`,
            ephemeral: true,
          });
        })
        .catch(async (err) => {
          await interaction.reply({
            content: `Houve um error ao coletar as mensagens!`,
            ephemeral: true,
          });
          return await console.log(
            `[ERROR BOT] Houve um erro ao coletar as mensagens!\n${err}`
          );
        });
    }

    if (interaction.commandName == "lock") {
      if (
        !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
      )
        return await interaction.reply({
          content: `Você não tem permissão para usar este comando!`,
          ephemeral: true,
        });

      await interaction.channel.permissionOverwrites.set([
        {
          id: interaction.guild.roles.everyone.id,
          deny: ["SendMessages"],
        },
      ]);

      await interaction.reply({
        content: `Canal <#${interaction.channel.id}> Bloqueado com sucesso!`,
        ephemeral: true,
      });
    }

    if (interaction.commandName == "unlock") {
      if (
        !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
      )
        return await interaction.reply({
          content: `Você não tem permissão para usar este comando!`,
          ephemeral: true,
        });

      await interaction.channel.permissionOverwrites.set([
        {
          id: interaction.guild.roles.everyone.id,
          allow: ["SendMessages"],
        },
      ]);

      await interaction.reply({
        content: `Canal <#${interaction.channel.id}> Desbloqueado com sucesso!`,
        ephemeral: true,
      });
    }

    if (interaction.commandName == "about") {
      const embedAbout = new EmbedBuilder()
        .setDescription(
          "**ABOUT**\n\n> " +
            `<@${interaction.applicationId}>: Sou um bot feito afins de estudos!\n> ` +
            `Fui desenvolvido em JS por um calouro em ADS!\n 
            ` +
            `Meu criador: <@905475185560399893>`
        )
        .setTimestamp()
        .setColor(colorEmbed)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setFooter({
          text: client.user.username + " " + "By" + " " + `Contempt`,
          iconURL: interaction.guild.iconURL({ dynamic: true }),
        });

      await interaction.reply({ embeds: [embedAbout], ephemeral: true });
    }

    if (interaction.commandName == "ticket") {
      if (
        !interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)
      )
        return await interaction.reply({
          content: `Você não tem permissão para usar este comando!`,
          ephemeral: true,
        });
      const embedTicket = new EmbedBuilder()
        .setTitle(`**Menu Ticket**`)
        .setDescription(
          `__**Selecione uma das opções abaixo:**__\n\n> 🚨 __**Fazer Denúncia**__\n> _Escolha essa opção para fazer uma denúncia sobre alguém_\n> \n> 💸 __**Suporte Compras**__\n> _Escolha essa opção para realizar alguma compra_\n> \n> 👾 __**Relatar Bug**__\n> _Escolha essa opção para relatar algum bug ou algo do tipo_\n> \n> ❓ __**Suporte**__\n> _Escolha essa opção caso seu problema não seja nenhuma das anteriores_ `
        )
        .setTimestamp()
        .setColor(colorEmbed)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setImage(
          "https://www.imagensanimadas.com/data/media/134/linha-divisoria-imagem-animada-0255.gif"
        )
        .setFooter({
          text: client.user.username + " " + "By" + " " + `Contempt`,
          iconURL: interaction.guild.iconURL({ dynamic: true }),
        });

      const rowTicket = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("rowTicket")
          .setPlaceholder("Selecione uma das opções")
          .addOptions(
            {
              label: "Fazer Denúncia",
              value: "fazer_denuncia",
              emoji: "🚨",
            },
            {
              label: "Suporte Compras",
              value: "suporte_compras",
              emoji: "💸",
            },
            {
              label: "Relatar Bug",
              value: "relatar_bug",
              emoji: "👾",
            },
            {
              label: "Suporte",
              value: "suporte",
              emoji: "❓",
            }
          )
      );

      await interaction.deferReply();
      await interaction.deleteReply();
      await interaction.channel.send({
        embeds: [embedTicket],
        components: [rowTicket],
      });
    }

    if (interaction.commandName == "kick") {
      const veCargo = await interaction.guild.roles.cache.find(
        (c) => c.name == "staff"
      );
      if (!veCargo) {
        await interaction.reply({
          content: `Falha ao localizar o cargo 'staff' !`,
          ephemeral: true,
        });
        return await console.log(
          `[ERROR BOT] Falha ao localizar o cargo 'staff' !`
        );
      }
      if (!interaction.member.roles.cache.has(veCargo.id))
        return await interaction.reply({
          content: `Você não tem permissão para usar este comando!`,
          ephemeral: true,
        });

      const user = await interaction.options.getUser("membro");
      const reason = await interaction.options.getString("motivo");

      if (reason != "" || reason != undefined || reason != null) {
        await interaction.guild.members.kick(user);
      } else {
        await interaction.guild.members.kick(user, reason);
      }

      await interaction.reply({
        content: `Usuário expulso com sucesso`,
        ephemeral: true,
      });
    }

    if (interaction.commandName == "join") {
      if (!interaction.member.voice.channel) {
        await interaction.reply({
          content:
            "Você precisa estar em um canal de voz para usar esse comando!",
          ephemeral: true,
        });
        return;
      }

      const connection = joinVoiceChannel({
        channelId: interaction.member.voice.channel.id,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });

      await interaction.reply({
        content: "Entrando no canal de voz sem tocar áudio!",
        ephemeral: true,
      });
    }

    if (interaction.commandName == "leave") {
      const connection = getVoiceConnection(interaction.guildId);

      if (connection) {
        connection.destroy();
        await interaction.reply("Saindo do canal de voz!");
      } else {
        await interaction.reply("O bot não está em nenhum canal de voz");
      }
    }

    const { commandName, options } = interaction;

    if (commandName === "ban") {
      const userToBan = options.getUser("user");
      const reason = options.getString("reason") || "sem motivo definido!";

      try {
        const memberToBan = await interaction.guild.members.fetch(userToBan);
        await memberToBan.ban({ reason });
        await interaction.reply(
          `<@${userToBan.id}> banido com sucesso por: "${reason}"`
        );
      } catch (error) {
        console.error("Erro ao banir usuário:", error);
        await interaction.reply({
          content: "Não foi possível banir o usuário.",
          ephemeral: true,
        });
      }
    }

    if (commandName === "unban") {
      const userToUnban = options.getUser("user");

      try {
        await interaction.guild.members.unban(userToUnban);
        await interaction.reply(`<@${userToUnban.id}> desbanido com sucesso.`);
      } catch (error) {
        console.error("Erro ao desbanir usuário:", error);
        await interaction.reply("Não foi possível desbanir o usuário.");
      }
    }

    if (interaction.commandName == "fembed") {
      if (
        !interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)
      )
        return await interaction.reply({
          content: "Você não tem permissão para usar este comando!",
        });

      const modal = new ModalBuilder()
        .setCustomId("modalFEmbed")
        .setTitle("Criar Embed");

      const paragrathFEmbed = new TextInputBuilder()
        .setCustomId("paragrathFEmbed")
        .setLabel("Defina a mensagem")
        .setRequired(true)
        .setStyle(TextInputStyle.Paragraph);

      const imgFEmbed = new TextInputBuilder()
        .setCustomId("imgFEmbed")
        .setLabel("Defina o link da imagem")
        .setRequired(false)
        .setStyle(TextInputStyle.Short);

      const imgUrl = interaction.options.getString("imgFEmbed");
      if (imgUrl) {
        if (
          !imgFEmbed.startsWith("http://") &&
          !imgFEmbed.startsWith("https://")
        )
          return await interaction.reply({
            content: `O link da imagem deve começar com 'http://' ou 'https://'.`,
            ephemeral: true,
          });
      }

      const textComponent = new ActionRowBuilder().addComponents(
        paragrathFEmbed
      );
      const imgComponent = new ActionRowBuilder().addComponents(imgFEmbed);

      await modal.addComponents(textComponent, imgComponent);
      await interaction.showModal(modal);
    }

    if (interaction.commandName == "caduser") {
      if (
        !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
      )
        return await interaction.reply({
          content: `Você não tem permissão para usar este comando!`,
          ephemeral: true,
        });

      const nome = await interaction.options.getString("nome");
      const idade = await interaction.options.getInteger("idade");

      await connection.query(
        `SELECT * FROM users WHERE name = '${nome}'`,
        async (err, row) => {
          if (err) {
            await interaction.reply({ content: `Houve um erro interno!` });
            return await console.log(
              `[ERROR BOT] Houve um erro interno!\n${err}`
            );
          }
          if (row.length >= 1)
            return await interaction.reply({
              content: `Já existe um cadastro com esse nome!`,
              ephemeral: true,
            });

          await connection.query(
            `INSERT INTO users (name,age) VALUES ('${nome})', '${idade}')`,
            async (err, row) => {
              if (err) {
                await interaction.reply({ content: `Houve um erro interno!` });
                return await console.log(
                  `[ERROR BOT] Houve um erro interno!\n${err}`
                );
              }
            }
          );
          return await interaction.reply({
            content: `Usuário cadastrado com Sucesso!`,
            ephemeral: true,
          });
        }
      );
    }

    if (interaction.commandName == "veallusers") {
      if (
        !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
      )
        return await interaction.reply({
          content: `Você não tem permissão para usar este comando!`,
          ephemeral: true,
        });

      await connection.query(`SELECT * FROM users`, async (err, row) => {
        if (err) {
          await interaction.reply({ content: `Houve um erro interno!` });
          return await console.log(
            `[ERROR BOT] Houve um erro interno!\n${err}`
          );
        }

        if (row.length >= 1) {
          var resposta = [];
          for (let x = 0; x <= row.length - 1; x++) {
            resposta +=
              "> ***ID:*** *`" +
              row[x].id +
              "`*\n> ***Nome:*** *`" +
              row[x].name +
              "`*\n> ***Idade:*** *`" +
              row[x].age +
              "`*\n\n";
          }
          return await interaction.reply({
            content: `${resposta}`,
            ephemeral: true,
          });
        } else {
          return await interaction.reply({
            content: `Nenhum cadastro encontrado!`,
            ephemeral: true,
          });
        }
      });
    }

    if (interaction.commandName == "veuser") {
      if (
        !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
      )
        return await interaction.reply({
          content: `Você não tem permissão para usar este comando!`,
          ephemeral: true,
        });

      const id = await interaction.options.getInteger("id");

      await connection.query(
        `SELECT * FROM users WHERE id - ${id}`,
        async (err, row) => {
          if (err) {
            await interaction.reply({ content: `Houve um erro interno!` });
            return await console.log(
              `[ERROR BOT] Houve um erro interno!\n${err}`
            );
          }

          if (row.length >= 1) {
            return await interaction.reply({
              content:
                "> ***ID:*** *`" +
                row[0].id +
                "`*\n> ***Nome:*** *`" +
                row[0].name +
                "`*\n> ***Idade:*** *`" +
                row[0].age +
                "`*\n\n",
              ephemeral: true,
            });
          } else {
            return await interaction.reply({
              content: `Nenhum cadastro encontrado!`,
              ephemeral: true,
            });
          }
        }
      );
    }

    if (interaction.commandName === "upuser") {
      if (
        !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
      ) {
        return await interaction.reply({
          content: `Você não tem permissão para usar este comando!`,
          ephemeral: true,
        });
      }

      const valor = interaction.options.getString("valor");
      const campo = interaction.options.getString("campo");
      const id = interaction.options.getInteger("id");

      connection.query(
        `SELECT * FROM users WHERE id = ${id}`,
        async (err, rows) => {
          if (err) {
            console.error(`[ERROR BOT] Houve um erro interno!\n${err}`);
            return await interaction.reply({
              content: `Houve um erro interno!`,
            });
          }

          if (rows.length <= 0) {
            return await interaction.reply({
              content: `Nenhum cadastro encontrado!`,
              ephemeral: true,
            });
          }

          connection.query(
            `UPDATE users SET ${campo} = ? WHERE id = ?`,
            [valor, id],
            async (err, updateResult) => {
              if (err) {
                console.error(`[ERROR BOT] Houve um erro interno!\n${err}`);
                return await interaction.reply({
                  content: `Houve um erro interno!`,
                });
              }

              return await interaction.reply({
                content: `Atualização de cadastro concluída!`,
                ephemeral: true,
              });
            }
          );
        }
      );
    }

    if (interaction.commandName == "deluser") {
      if (
        !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
      )
        return await interaction.reply({
          content: "Você não tem permissão para usar este comando!",
          ephemeral: true,
        });

      const id = await interaction.options.getInteger("id");

      await connection.query(
        `SELECT * FROM users WHERE id = ${id}`,
        async (err, row) => {
          if (err) {
            await interaction.reply({ content: `Houve um erro interno!` });
            return await console.log(
              `[ERROR BOT] Houve um erro interno!\n${err}`
            );
          }

          if (row.length <= 0)
            return await interaction.reply({
              content: `Nenhum cadastro encontrado!`,
              ephemeral: true,
            });

          await connection.query(
            `DELETE FROM users WHERE id = ${id}`,
            async (err, row) => {
              if (err) {
                await interaction.reply({ content: `Houve um erro interno!` });
                return await console.log(
                  `[ERROR BOT] Houve um erro interno!\n${err}`
                );
              }
              return await interaction.reply({
                content: `Usuário deletado do banco de dados!`,
                ephemeral: true,
              });
            }
          );
        }
      );
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId == "modalFEmbed") {
      const veImg = await interaction.fields.getTextInputValue("imgFEmbed");
      if (!veImg) {
        const embedFEmbedSubmit = new EmbedBuilder()
          .setDescription(
            `${interaction.fields.getTextInputValue("paragrathFEmbed")}`
          )
          .setColor(colorEmbed);

        return await interaction.channel
          .send({ embeds: [embedFEmbedSubmit] })
          .then(async () => {
            await interaction.deferReply();
            await interaction.deleteReply();
          });
      } else {
        const embedFEmbedSubmitImg = new EmbedBuilder()
          .setDescription(
            `${interaction.fields.getTextInputValue("paragrathFEmbed")}`
          )
          .setColor(colorEmbed)
          .setImage(veImg);

        return await interaction.channel
          .send({
            embeds: [embedFEmbedSubmitImg],
          })
          .then(async () => {
            await interaction.deferReply();
            await interaction.deleteReply();
          });
      }
    }
  }

  if (interaction.isStringSelectMenu()) {
    interaction.message.edit({});
    if (interaction.values == "fazer_denuncia") {
      if (
        interaction.guild.channels.cache.find(
          (c) => c.topic === interaction.user.id
        )
      ) {
        interaction.reply({
          content: `**Calma! Você já tem um ticket aberto em ${interaction.guild.channels.cache.find(
            (c) => c.topic === interaction.user.id
          )}.**`,
          ephemeral: true,
        });
      } else {
        var parent;
        if (interaction.channel.parent) parent = interaction.channel.parent;
        await interaction.guild.channels
          .create({
            name: `🚨fazer-denuncia-${interaction.user.id}`,
            topic: interaction.user.id,
            type: ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.roles.everyone.id,
                deny: ["ViewChannel"],
              },
              {
                id: interaction.user.id,
                allow: ["ViewChannel", "SendMessages"],
              },
            ],
            parent: parent,
          })
          .then(async (channel) => {
            await interaction.reply({
              content: `Ticket Aberto... **<#${channel.id}>**`,
              ephemeral: true,
            });

            const embedTicketAberto = new EmbedBuilder()
              .setTitle(`**TICKET ABERTO**`)
              .setDescription(
                `> __Descreva abaixo o ocorrido que nossa equipe virá o mais rápido possível lhe atender__\n\n __**TODOS OS STAFFS JÁ FORAM AVISADOS!**__`
              )
              .setColor(colorEmbed)
              .setTimestamp()
              .setFooter({
                text: client.user.username + " " + "By" + " " + `Contempt`,
                iconURL: interaction.guild.iconURL({ dynamic: true }),
              });

            const btnFecharTicket = new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId("btnFecharTicket")
                .setLabel("Fechar Ticket")
                .setStyle(ButtonStyle.Danger)
            );

            await channel.send({
              content: `||***[ <@${interaction.user.id}> / @here ]***||`,
              embeds: [embedTicketAberto],
              components: [btnFecharTicket],
            });
          })
          .catch(async (err) => {
            await interaction.reply({
              content: `[ERROR BOT] Houve um erro ao criar o canal! Tente novamente!`,
              ephemeral: true,
            });
            return await console.log(
              `[ERROR BOT] Houve um erro ao criar o canal!!\n${err}`
            );
          });
      }
    }

    if (interaction.values == "suporte_compras") {
      if (
        interaction.guild.channels.cache.find(
          (c) => c.topic === interaction.user.id
        )
      ) {
        interaction.reply({
          content: `**Calma! Você já tem um ticket aberto em ${interaction.guild.channels.cache.find(
            (c) => c.topic === interaction.user.id
          )}.**`,
          ephemeral: true,
        });
      } else {
        var parent;
        if (interaction.channel.parent) parent = interaction.channel.parent;
        await interaction.guild.channels
          .create({
            name: `💸suporte-compras-${interaction.user.id}`,
            topic: interaction.user.id,
            type: ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.roles.everyone.id,
                deny: ["ViewChannel"],
              },
              {
                id: interaction.user.id,
                allow: ["ViewChannel", "SendMessages"],
              },
            ],
            parent: parent,
          })
          .then(async (channel) => {
            await interaction.reply({
              content: `Ticket Aberto... **<#${channel.id}>**`,
              ephemeral: true,
            });

            const embedTicketAberto = new EmbedBuilder()
              .setTitle(`**TICKET ABERTO**`)
              .setDescription(
                `> __Descreva abaixo o ocorrido que nossa equipe virá o mais rápido possível lhe atender__\n\n __**TODOS OS STAFFS JÁ FORAM AVISADOS!**__`
              )
              .setColor(colorEmbed)
              .setTimestamp()
              .setFooter({
                text: client.user.username + " " + "By" + " " + `Contempt`,
                iconURL: interaction.guild.iconURL({ dynamic: true }),
              });

            const btnFecharTicket = new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId("btnFecharTicket")
                .setLabel("Fechar Ticket")
                .setStyle(ButtonStyle.Danger)
            );

            await channel.send({
              content: `||***[ <@${interaction.user.id}> / @here ]***||`,
              embeds: [embedTicketAberto],
              components: [btnFecharTicket],
            });
          })
          .catch(async (err) => {
            await interaction.reply({
              content: `[ERROR BOT] Houve um erro ao criar o canal! Tente novamente!`,
              ephemeral: true,
            });
            return await console.log(
              `[ERROR BOT] Houve um erro ao criar o canal!!\n${err}`
            );
          });
      }
    }

    if (interaction.values == "suporte") {
      if (
        interaction.guild.channels.cache.find(
          (c) => c.topic === interaction.user.id
        )
      ) {
        interaction.reply({
          content: `**Calma! Você já tem um ticket aberto em ${interaction.guild.channels.cache.find(
            (c) => c.topic === interaction.user.id
          )}.**`,
          ephemeral: true,
        });
      } else {
        var parent;
        if (interaction.channel.parent) parent = interaction.channel.parent;
        await interaction.guild.channels
          .create({
            name: `❓ suporte-${interaction.user.id}`,
            type: ChannelType.GuildText,
            topic: interaction.user.id,
            permissionOverwrites: [
              {
                id: interaction.guild.roles.everyone.id,
                deny: ["ViewChannel"],
              },
              {
                id: interaction.user.id,
                allow: ["ViewChannel", "SendMessages"],
              },
            ],
            parent: parent,
          })
          .then(async (channel) => {
            await interaction.reply({
              content: `Ticket Aberto... **<#${channel.id}>**`,
              ephemeral: true,
            });

            const embedTicketAberto = new EmbedBuilder()
              .setTitle(`**TICKET ABERTO**`)
              .setDescription(
                `> __Descreva abaixo o ocorrido que nossa equipe virá o mais rápido possível lhe atender__\n\n __**TODOS OS STAFFS JÁ FORAM AVISADOS!**__`
              )
              .setColor(colorEmbed)
              .setTimestamp()
              .setFooter({
                text: client.user.username + " " + "By" + " " + `Contempt`,
                iconURL: interaction.guild.iconURL({ dynamic: true }),
              });

            const btnFecharTicket = new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId("btnFecharTicket")
                .setLabel("Fechar Ticket")
                .setStyle(ButtonStyle.Danger)
            );

            await channel.send({
              content: `||***[ <@${interaction.user.id}> / @here ]***||`,
              embeds: [embedTicketAberto],
              components: [btnFecharTicket],
            });
          })
          .catch(async (err) => {
            await interaction.reply({
              content: `[ERROR BOT] Houve um erro ao criar o canal! Tente novamente!`,
              ephemeral: true,
            });
            return await console.log(
              `[ERROR BOT] Houve um erro ao criar o canal!!\n${err}`
            );
          });
      }
    }

    if (interaction.values == "relatar_bug") {
      if (
        interaction.guild.channels.cache.find(
          (c) => c.topic === interaction.user.id
        )
      ) {
        interaction.reply({
          content: `**Calma! Você já tem um ticket aberto em ${interaction.guild.channels.cache.find(
            (c) => c.topic === interaction.user.id
          )}.**`,
          ephemeral: true,
        });
      } else {
        var parent;
        if (interaction.channel.parent) parent = interaction.channel.parent;
        await interaction.guild.channels
          .create({
            name: `👾relatar-bug-${interaction.user.id}`,
            type: ChannelType.GuildText,
            topic: interaction.user.id,
            permissionOverwrites: [
              {
                id: interaction.guild.roles.everyone.id,
                deny: ["ViewChannel"],
              },
              {
                id: interaction.user.id,
                allow: ["ViewChannel", "SendMessages"],
              },
            ],
            parent: parent,
          })
          .then(async (channel) => {
            await interaction.reply({
              content: `Ticket Aberto... **<#${channel.id}>**`,
              ephemeral: true,
            });

            const embedTicketAberto = new EmbedBuilder()
              .setTitle(`**TICKET ABERTO**`)
              .setDescription(
                `> __Descreva abaixo o ocorrido que nossa equipe virá o mais rápido possível lhe atender__\n\n __**TODOS OS STAFFS JÁ FORAM AVISADOS!**__`
              )
              .setColor(colorEmbed)
              .setTimestamp()
              .setFooter({
                text: client.user.username + " " + "By" + " " + `Contempt`,
                iconURL: interaction.guild.iconURL({ dynamic: true }),
              });

            const btnFecharTicket = new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId("btnFecharTicket")
                .setLabel("Fechar Ticket")
                .setStyle(ButtonStyle.Danger)
            );

            await channel.send({
              content: `||***[ <@${interaction.user.id}> / @here ]***||`,
              embeds: [embedTicketAberto],
              components: [btnFecharTicket],
            });
          })
          .catch(async (err) => {
            await interaction.reply({
              content: `[ERROR BOT] Houve um erro ao criar o canal! Tente novamente!`,
              ephemeral: true,
            });
            return await console.log(
              `[ERROR BOT] Houve um erro ao criar o canal!!\n${err}`
            );
          });
      }
    }
  }

  if (interaction.isButton()) {
    if (interaction.customId == "btnCancelar") {
      await interaction.channel.delete();
    }

    if (interaction.customId == "btnFecharTicket") {
      await interaction.channel.delete();
    }
  }
});

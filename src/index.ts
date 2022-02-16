var ffi = require("ffi-napi");
var ref = require("ref-napi");
var struct = require("ref-struct-di");
var array = require("ref-array-napi");
var finalize = require("finalize");
const path = require("path");
const http = require("http");
const os = require("os");
const readline = require("readline");
const moment = require("moment");
const chalk = require("chalk");

require("moment/locale/pt-br");

const log = console.log;

const now = () => chalk.green(`[${moment().format("LTS")}]`);
const menu = `
1 - AbrirPortaComunicacao
`;

/* Constantes de Retorno EasyInner */
const RET_COMANDO_OK = 0;
const RET_COMANDO_ERRO = 1;
const RET_PORTA_NAOABERTA = 2;
const RET_PORTA_JAABERTA = 3;
const RET_DLL_INNER2K_NAO_ENCONTRADA = 4;
const RET_DLL_INNERTCP_NAO_ENCONTRADA = 5;
const RET_DLL_INNERTCP2_NAO_ENCONTRADA = 5;
const RET_ERRO_GPF = 8;
const RET_TIPO_CONEXAO_INVALIDA = 9;

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function loadLibraries() {
  const dllEI = await path.resolve(__dirname, "..", "bin", "EasyInner.dll");
  return dllEI;
}

async function main() {
  const dllEasyInner = await loadLibraries();
  const easyInner = await ffi.Library(dllEasyInner, {
    FecharPortaComunicacao: ["void", []],
    DefinirTipoConexao: ["int", ["int"]],
    AbrirPortaComunicacao: ["int", ["int"]],
  });

  console.log("\n\n*** Pressione Ctrl+C para finalizar a aplicação ***");
  let ret = 0;
  //easyInner.FecharPortaComunicacao();
  easyInner.DefinirTipoConexao(2);
  ret = easyInner.AbrirPortaComunicacao(3570);
  if (ret == RET_COMANDO_OK) {
    console.log(`${now()} Porta aberta com sucesso!`);
  } else {
    console.log(`${now()} Erro ao abrir a porta!`);
  }
  let res = null;
  let leitor = function () {
    rl.question(menu, function (comando: string) {
      switch (comando) {
        case "1":
          break;
        case "2":
          break;
        case "3":
          break;
        case "4":
          break;
        case "5":
          break;
        case "6":
          break;
        case "7":
          break;
        default:
          break;
      }
      leitor();
    });
  };
  leitor();
}

if (os.arch() === "ia32") {
  console.log(
    `Aplicação de demonstração EasyInner com integração para NodeJS rodando no sistema operation Windows.`
  );
  console.log(`Testado no Windows 11, com Node 14.17.2 32 Bits.`);
  main();
} else {
  console.log("This project only works on x86");
}

import { z } from "zod";

export const formSchema = z.object({
  _id: z.string().optional(),
  Data: z.string().optional(),
  Dicofre: z.string().optional(),
  Localizacao: z.string().optional(),
  Especie: z.string(),
  Nomecomum: z.string(),
  Estado_fit: z.string(),
  Esdado_cal: z.string(),
  Ava_Risco: z.string().optional(),
  Propo_Inte: z.string().optional(),
  Obser: z.string().optional(),
  GlobalID: z.string().optional(),
  raz_calssifica: z.string().optional(),
  agen_bioticos: z.string().optional(),
  Orgaos_afetados: z.string().optional(),
  Grau_de_desfolha: z.string().optional(),
  Sintomas_sinais_desfolhadores: z.string().optional(),
  Grau_de_descoloracao_da_copa: z.string().optional(),
  Deformacao_dos_tecidos: z.string().optional(),
  Alteracao_da_estrutura: z.string().optional(),
  Supressao_parcial_dos_orgaos: z.string().optional(),
  Orificios_perfuracoes: z.string().optional(),
  galerias: z.string().optional(),
  necroses: z.string().optional(),
  serrim: z.string().optional(),
  exsudacao: z.string().optional(),
  novelos_fibra: z.string().optional(),
  Forma_caldeira: z.string().optional(),
  Altura_v2: z.string().optional(),
  capv2: z.string().optional(),
  DAP_v2: z.string().optional(),
  idade_apro_v2: z.string().optional(),
  Especie_Val: z.string().optional(),
  Outro_Nome_Comum: z.string().optional(),
  Outra_Especie: z.string().optional(),
  Codigo: z.string().optional(),
  Outra_Tip_Int: z.string().optional(),
  grupos: z.string().optional(),
  POINT_X_G: z.string().refine((value) => value !== "0", {
    message: "Coordenada X não pode ser 0",
  }),
  POINT_Y_G: z.string().refine((value) => value !== "0", {
    message: "Coordenada Y não pode ser 0",
  }),
  POINT_Z: z.string().optional(),
  Fotos: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

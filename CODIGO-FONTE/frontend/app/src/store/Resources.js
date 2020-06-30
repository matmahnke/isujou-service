export default class Resources {
  static GetBrazilianStates() {
    return [
      { id: 1, description: "Acre" },
      { id: 2, description: "Alagoas" },
      { id: 3, description: "Amapá" },
      { id: 4, description: "Amazonas" },
      { id: 5, description: "Bahia" },
      { id: 6, description: "Ceará" },
      { id: 7, description: "Distrito Federal" },
      { id: 8, description: "Espírito Santo" },
      { id: 9, description: "Goiás" },
      { id: 10, description: "Maranhão" },
      { id: 11, description: "Mato Grosso" },
      { id: 12, description: "Mato Grosso do Sul" },
      { id: 13, description: "Minas Gerais" },
      { id: 14, description: "Pará" },
      { id: 15, description: "Paraíba" },
      { id: 16, description: "Paraná" },
      { id: 17, description: "Pernambuco" },
      { id: 18, description: "Piauí" },
      { id: 19, description: "Rio de Janeiro" },
      { id: 20, description: "Rio Grande do Norte" },
      { id: 21, description: "Rio Grande do Sul" },
      { id: 22, description: "Rondônia" },
      { id: 23, description: "Roraima" },
      { id: 24, description: "Santa Catarina" },
      { id: 25, description: "São Paulo" },
      { id: 26, description: "Sergipe" },
      { id: 27, description: "Tocantins" }
    ]
  }

  static GetContractStatus() {
    return [
      { id: 1, description: "Aberto" },
      { id: 2, description: "Enviado ao contratado" },
      { id: 3, description: "Enviado ao proprietário" },
      { id: 4, description: "Ativo" },
      { id: 5, description: "Concluído" },
      { id: 6, description: "Suspenso" }
    ]
  }

  static GetGenders() {
    return [
      { id: 1, description: "Homem" },
      { id: 2, description: "Mulher" },
      { id: 3, description: "Outro" }
    ]
  }

  static GetProposalStatus() {
    return [
      { id: 1, description: "Pendente" },
      { id: 2, description: "Recusada" },
      { id: 3, description: "Aceita", subdescription: "aguardando iniciar" },
      { id: 4, description: "Cancelada" },
      { id: 5, description: "Ativa", subdescription: "aguardando ser concluída" },
      { id: 6, description: "Concluída" }
    ]
  }
}
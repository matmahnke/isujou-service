export default class Achievements {
  static GetAll() {
    return [
      { id: 1, description: 'Tudo brilhando!', icon: require('../assets/img/feedback/tudo-brilhando.png') },
      { id: 2, description: 'Boa limpeza', icon: require('../assets/img/feedback/boa-limpeza.png') },
      { id: 3, description: 'Limpeza das louças', icon: require('../assets/img/feedback/loucas.png') },
      { id: 4, description: 'Cuidadoso', icon: require('../assets/img/feedback/cuidadoso.png') },
      { id: 5, description: 'Limpeza da lavanderia', icon: require('../assets/img/feedback/lavanderia.png') },
      { id: 6, description: 'Bons materiais', icon: require('../assets/img/feedback/bons-materiais.png') },
      { id: 7, description: 'Limpeza do banheiro', icon: require('../assets/img/feedback/banheiro.png') },
      { id: 8, description: 'Limpeza das roupas', icon: require('../assets/img/feedback/roupas.png') },
      { id: 9, description: 'Cuidado pessoal', icon: require('../assets/img/feedback/cuidado-pessoal.png') },
      { id: 10, description: 'Bom negócio', icon: require('../assets/img/feedback/bom-negocio.png') },
      { id: 11, description: 'Bom preço', icon: require('../assets/img/feedback/bom-preco.png') },
      { id: 12, description: 'Simpático', icon: require('../assets/img/feedback/simpatico.png') }
    ]
  }
}
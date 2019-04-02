/**
 * Color Options
 * @readonly
 *
 * @description All of the default colors available with the app.
 *
 * @todo Clarify what the purspose of these colors are and see if there are
 *       any alternatives.
 */

const color = {
    // Normal Colors
    standard: [
        ['#D8544F', '#448CCA'],
        ['#60D394', '#FFD97D'],
        ['#ADA8B6', '#DE6B48'],
        ['#9AADBF', '#C6878F'],
    ],

    // Alternative Schemes
    bizarro: [
        ['#448CCA', '#D8544F'],
        ['#FFD97D', '#60D394'],
        ['#DE6B48', '#ADA8B6'],
        ['#C6878F', '#9AADBF'],
    ],
    rainbow: [
        '#FF0000', '#FF0700', '#FF0E00', '#FF1500', '#FF1C00', '#FF2300',
        '#FF2A00', '#FF3200', '#FF3900', '#FF4000', '#FF4700', '#FF4E00',
        '#FF5500', '#FF5D00', '#FF6400', '#FF6B00', '#FF7200', '#FF7900',
        '#FF8000', '#FF8800', '#FF8E00', '#FF9400', '#FF9A00', '#FFA100',
        '#FFA700', '#FFAD00', '#FFB300', '#FFBA00', '#FFC000', '#FFC600',
        '#FFCC00', '#FFD300', '#FFD900', '#FFDF00', '#FFE500', '#FFEC00',
        '#FFF200', '#FFF800', '#FFFF00', '#F1FE03', '#E4FE06', '#D7FE0A',
        '#C9FD0D', '#BCFD11', '#AFFD14', '#A2FD17', '#94FC1B', '#87FC1E',
        '#7AFC22', '#6DFC25', '#5FFB29', '#52FB2C', '#45FB2F', '#38FB33',
        '#2AFA36', '#1DFA3A', '#10FA3D', '#03FA41', '#02FA4A', '#02FA54',
        '#02FA5D', '#02FB67', '#02FB70', '#02FB7A', '#01FB84', '#01FC8D',
        '#01FC97', '#01FCA0', '#01FCAA', '#01FDB3', '#00FDBD', '#00FDC7',
        '#00FDD0', '#00FEDA', '#00FEE3', '#00FEED', '#00FFF7', '#01F1F7',
        '#02E4F7', '#03D6F8', '#04C9F8', '#05BBF9', '#06AEF9', '#07A1F9',
        '#0893FA', '#0986FA', '#0B78FB', '#0C6BFB', '#0D5DFC', '#0E50FC',
        '#0F43FC', '#1035FD', '#1128FD', '#121AFE', '#130DFE', '#1500FF',
        '#1A00FE', '#1F00FD', '#2400FC', '#2900FB', '#2F00FA', '#3400F9',
        '#3900F8', '#3E00F7', '#4400F6', '#4900F5', '#4E00F4', '#5300F3',
        '#5800F2', '#5E00F1', '#6300F0', '#6800EF', '#6D00EE', '#7300ED',
        '#7A00EC', '#8200EB', '#8A00EA', '#9200E9', '#9900E8', '#A100E7',
        '#A900E6', '#B100E5', '#B900E5', '#C000E4', '#C800E3', '#D000E2',
        '#D800E1', '#DF00E0', '#E700DF', '#EF00DE', '#F700DD', '#FF00DD',
        '#FF00D0', '#FF00C4', '#FF00B8', '#FF00AB', '#FF009F', '#FF0093',
        '#FF0087', '#FF007A', '#FF006E', '#FF0062', '#FF0055', '#FF0049',
        '#FF003D', '#FF0031', '#FF0024', '#FF0018', '#FF000C', '#FF0000',
    ],
    resistor: [
        '#996633', '#FF0000', '#FF9900', '#FFFF00', '#00FF00', '#0000FF',
        '#FF00FF', '#CCC', '#FFF', '#303030',
    ],

    // Special Schemes
    checkerboard: ['#FFFFFF', '#000000'],
    red100: ['#FF0000', '#800000'],
    green100: ['#00FF00', '#008000'],
    blue100: ['#0000FF', '#000080'],
    white100: ['#FFFFFF', '#808080'],

    // Style Palette
    string: '#FFF',
    processorBorder: '#FFF',
    tileBorder: '#000',
    tileIndex: '#000',
};

export default color;

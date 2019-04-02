import Tile from './components/classes/component.object.Tile';

const item = {
    brand: 'Acme Tech',
    model: 'XJR-92B',
    pixel_pitch: 3.22,
    height: 35,
    width: 35,
    physical_height: 42,
    physical_width: 73,
    weight: 1.9,
    power_stack_limit: 22,
    hang_limit: 180,
};

console.log(new Tile(item));

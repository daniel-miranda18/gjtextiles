<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ImagesProductResource\Pages;
use App\Filament\Resources\ImagesProductResource\RelationManagers;
use App\Models\ImagesProduct;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\Select;

class ImagesProductResource extends Resource
{
    protected static ?string $model = ImagesProduct::class;

    protected static ?string $navigationIcon = 'heroicon-o-arrow-up';

    protected static ?string $label = 'Subir Imágenes';

    protected static ?string $navigationGroup = 'Productos';

    protected static ?int $navigationSort = 2;

    public static function shouldBeShownInSidebar(): bool
    {
        return false;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('product_id')
                    ->label('Producto')
                    ->searchable()
                    ->relationship('product', 'name')
                    ->required(),
                Select::make('color_id')
                    ->label('Color')
                    ->relationship('color', 'name')
                    ->required(),
                Forms\Components\FileUpload::make('image')
                    ->label('Imagen')
                    ->image()
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('product.name')
                    ->label('Producto')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('color.name')
                    ->label('Color')
                    ->numeric()
                    ->sortable()
                    ->searchable(),
                Tables\Columns\ImageColumn::make('image')
                    ->label('Imagen'),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Fecha de Creación')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Fecha de Actualización')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()->modalHeading('Borrar Imagen'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListImagesProducts::route('/'),
            'create' => Pages\CreateImagesProduct::route('/create'),
            'edit' => Pages\EditImagesProduct::route('/{record}/edit'),
        ];
    }
}
